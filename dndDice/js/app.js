/* ===== App State & Core Logic ===== */

let tray = [], trayModifier = 0, hasModifier = false, rollHistory = [];
let currentSkin = 'classic';

/* ===== Skin Switching ===== */
const themeColors = { classic: '#202124', crystal: '#121218', nebula: '#0a0005' };

function setSkin(skin) {
  currentSkin = skin;
  if (skin === 'crystal') document.body.className = 'skin-crystal';
  else if (skin === 'nebula') document.body.className = 'skin-nebula';
  else document.body.className = '';
  document.querySelectorAll('.skin-opt').forEach(o => o.classList.toggle('active', o.dataset.skin === skin));
  // Update mobile browser chrome color
  const tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.content = themeColors[skin] || themeColors.classic;
  renderTray();
  if (document.getElementById('resultsArea').classList.contains('show') && rollHistory.length > 0) {
    reRenderLastResult();
  }
  renderHistory();
}

function reRenderLastResult() {
  if (rollHistory.length === 0) return;
  const h = rollHistory[0];
  const resultsEl = document.getElementById('diceResults');
  resultsEl.innerHTML = '';
  const order = [4,6,8,10,12,20,100];
  const groups = {};
  h.diceData.forEach((d,i) => { if(!groups[d.sides]) groups[d.sides]=[]; groups[d.sides].push(d); });
  const multiGroup = Object.keys(groups).length > 1;
  let delayIdx = 0;
  order.forEach(sides => {
    if(!groups[sides]) return;
    if(multiGroup) {
      const label = document.createElement('div');
      label.className = 'group-label';
      label.textContent = `${groups[sides].length}d${sides}`;
      resultsEl.appendChild(label);
    }
    groups[sides].forEach(d => {
      const color = diceColors[d.sides]||'#607d8b';
      const el = document.createElement('div');
      el.className = 'die-result';
      el.style.setProperty('--die-glow', diceGlows[d.sides]||'rgba(255,255,255,0.1)');
      el.style.animationDelay = `${delayIdx*0.1}s`;
      if(d.sides===20&&d.value===20) el.classList.add('crit');
      if(d.sides===20&&d.value===1) el.classList.add('fail');
      el.innerHTML = getDieSVG(d.sides,color,90)+`<span class="die-value">${d.value}</span>`+makeSparkles(d.sides);
      resultsEl.appendChild(el);
      delayIdx++;
    });
  });
}

/* ===== Tray Management ===== */
function buildNotation() {
  if(!tray.length&&!hasModifier) return '';
  const g={}; tray.forEach(s=>{g[s]=(g[s]||0)+1});
  let p=[]; [4,6,8,10,12,20,100].forEach(s=>{if(g[s])p.push(`${g[s]}d${s}`)});
  let str=p.join(' + ');
  if(hasModifier&&trayModifier!==0) str+=trayModifier>0?` + ${trayModifier}`:` - ${Math.abs(trayModifier)}`;
  return str;
}
function addToTray(s){if(tray.length>=20)return;tray.push(s);renderTray()}
function removeFromTray(i){tray.splice(i,1);renderTray()}
function removeModifier(){hasModifier=false;trayModifier=0;renderTray()}
function addModifier(){if(hasModifier)return;hasModifier=true;trayModifier=0;renderTray();setTimeout(()=>{const i=document.getElementById('trayModInput');if(i)i.focus()},50)}

function renderTray() {
  const te=document.getElementById('trayDice'), ne=document.getElementById('trayNotation'), rb=document.getElementById('rollBtn');
  ne.textContent=buildNotation(); rb.disabled=tray.length===0;
  if(!tray.length&&!hasModifier){te.className='tray-dice empty';te.innerHTML='點擊上方骰子加入托盤';return}
  te.className='tray-dice'; te.innerHTML='';
  tray.forEach((sides,i)=>{
    const el=document.createElement('div');el.className='tray-die';el.title=`d${sides}（點擊移除）`;
    el.onclick=()=>removeFromTray(i);
    el.innerHTML=getDieSVG(sides,diceColors[sides]||'#607d8b',50)+`<span class="tray-die-label">d${sides}</span>`;
    te.appendChild(el);
  });
  if(hasModifier){
    const m=document.createElement('div');m.className='tray-mod';m.title='點擊 ✕ 移除修正值';
    m.innerHTML=`<span>±</span><input type="number" id="trayModInput" value="${trayModifier}" min="-99" max="99" onclick="event.stopPropagation()" oninput="trayModifier=parseInt(this.value)||0;document.getElementById('trayNotation').textContent=buildNotation()"><span style="cursor:pointer;color:#f44336;font-size:14px;margin-left:4px" onclick="event.stopPropagation();removeModifier()">✕</span>`;
    te.appendChild(m);
  }
}

/* ===== Rolling ===== */
function rollDice() {
  if(!tray.length) return;
  const ra=document.getElementById('resultsArea'), re=document.getElementById('diceResults'), rl=document.getElementById('resultsLabel');
  ra.classList.add('show'); re.innerHTML='';
  const notation=buildNotation(), mod=hasModifier?trayModifier:0;
  const order=[4,6,8,10,12,20,100], groups={};
  tray.forEach((s,i)=>{if(!groups[s])groups[s]=[];groups[s].push(i)});
  let allRolls=new Array(tray.length), total=0, delayIdx=0, rollDetails=[];
  order.forEach(sides=>{
    if(!groups[sides])return;
    const indices=groups[sides], color=diceColors[sides]||'#607d8b';
    let gr=[];
    if(Object.keys(groups).length>1){const l=document.createElement('div');l.className='group-label';l.textContent=`${indices.length}d${sides}`;re.appendChild(l)}
    indices.forEach(idx=>{
      const v=Math.floor(Math.random()*sides)+1; allRolls[idx]=v; total+=v; gr.push(v);
      const d=document.createElement('div');d.className='die-result';
      d.style.setProperty('--die-glow',diceGlows[sides]||'rgba(255,255,255,0.1)');
      d.style.animationDelay=`${delayIdx*0.1}s`;
      if(sides===20&&v===20)d.classList.add('crit');
      if(sides===20&&v===1)d.classList.add('fail');
      d.innerHTML=getDieSVG(sides,color,90)+`<span class="die-value">${v}</span>`+makeSparkles(sides);
      re.appendChild(d); delayIdx++;
    });
    rollDetails.push({sides,rolls:gr});
  });
  const gt=total+mod;
  rl.textContent=`擲骰結果 — ${notation}`;
  document.getElementById('totalValue').textContent=gt;
  const md=document.getElementById('modifierDisplay');
  let dp=[]; rollDetails.forEach(g=>{dp.push(g.rolls.length===1?`[d${g.sides}: ${g.rolls[0]}]`:`[${g.rolls.length}d${g.sides}: ${g.rolls.join('+')}=${g.rolls.reduce((a,b)=>a+b,0)}]`)});
  let detail=dp.join(' + '); if(mod!==0)detail+=` ${mod>0?'+':'−'} ${Math.abs(mod)}`;
  md.textContent=detail;
  let dd=[]; rollDetails.forEach(g=>{g.rolls.forEach(v=>dd.push({sides:g.sides,value:v}))});
  rollHistory.unshift({notation,diceData:dd,modifier:mod,total:gt});
  if(rollHistory.length>20)rollHistory.pop();
  renderHistory();
}

function quickRoll(a,m){tray=[...a];hasModifier=m?true:false;trayModifier=m||0;renderTray();rollDice()}
function clearTray(){tray=[];hasModifier=false;trayModifier=0;renderTray();document.getElementById('resultsArea').classList.remove('show')}

/* ===== History ===== */
function renderHistory() {
  const s=document.getElementById('historySection'), l=document.getElementById('historyList');
  if(!rollHistory.length){s.style.display='none';return}
  s.style.display='block';
  l.innerHTML=rollHistory.map(h=>{
    let dh='';
    h.diceData.forEach((d,i)=>{
      if(i>0)dh+='<span class="h-plus">+</span>';
      const c=diceColors[d.sides]||'#607d8b';
      let cls='h-die';
      if(d.sides===20&&d.value===20)cls+=' crit';
      if(d.sides===20&&d.value===1)cls+=' fail';
      dh+=`<div class="${cls}">${getDieSVG(d.sides,c,36)}<span class="h-die-val">${d.value}</span></div>`;
    });
    if(h.modifier&&h.modifier!==0){dh+='<span class="h-plus">+</span>';dh+=`<span class="h-mod-badge">${h.modifier>0?'+':''}${h.modifier}</span>`}
    return `<div class="history-item" title="點擊重新擲 ${h.notation}" onclick="rerollFromHistory('${h.notation}')">
      <div class="history-item-top"><span class="h-notation">${h.notation}</span><span class="h-total-badge">${h.total}</span></div>
      <div class="h-dice-row">${dh}</div></div>`;
  }).join('');
}

function clearHistory(){rollHistory=[];renderHistory()}
function rerollFromHistory(n){
  let t=[],m=0,hm=false;
  n.replace(/\s/g,'').replace(/\-/g,'+-').split('+').filter(Boolean).forEach(p=>{
    const d=p.match(/^(\d+)d(\d+)$/);
    if(d){for(let i=0;i<parseInt(d[1]);i++)t.push(parseInt(d[2]))}
    else{const v=parseInt(p);if(!isNaN(v)){m=v;hm=true}}
  });
  tray=t;hasModifier=hm;trayModifier=m;renderTray();rollDice();
}

/* ===== Event Listeners ===== */
document.querySelectorAll('.dice-btn').forEach(b=>b.addEventListener('click',()=>addToTray(parseInt(b.dataset.sides))));
document.getElementById('addModBtn').addEventListener('click',addModifier);
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  if(e.code==='Space'||e.code==='Enter'){e.preventDefault();rollDice()}
  if(e.code==='Escape')clearTray();
});
