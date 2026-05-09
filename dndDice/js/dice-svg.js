/* ===== Dice SVG Generators & Particle Effects ===== */

let nid = 0; // unique ID counter for nebula gradients

const diceColors = { 4:'#34a853', 6:'#00bcd4', 8:'#9c27b0', 10:'#e91e63', 12:'#f44336', 20:'#ff9800', 100:'#607d8b' };
const diceGlows = { 4:'rgba(52,168,83,0.5)', 6:'rgba(0,188,212,0.5)', 8:'rgba(156,39,176,0.5)', 10:'rgba(233,30,99,0.5)', 12:'rgba(244,67,54,0.5)', 20:'rgba(255,152,0,0.5)', 100:'rgba(96,125,139,0.5)' };

// Nebula color palettes per die type
const nebulaColors = {
  4:  { c1:'#ff9900', c2:'#cc3300', c3:'#ffdd00', core:'#330500', edge:'#ffaa33' },
  6:  { c1:'#ff6600', c2:'#aa1100', c3:'#ffcc00', core:'#2a0200', edge:'#ff8844' },
  8:  { c1:'#ff4400', c2:'#990000', c3:'#ff8800', core:'#200000', edge:'#ff6622' },
  10: { c1:'#ff3300', c2:'#880000', c3:'#ff6600', core:'#1a0000', edge:'#ff5533' },
  12: { c1:'#ff2200', c2:'#770000', c3:'#ff5500', core:'#150000', edge:'#ff4422' },
  20: { c1:'#ffaa00', c2:'#dd4400', c3:'#ffee44', core:'#2d0800', edge:'#ffcc33' },
  100:{ c1:'#ff7733', c2:'#993300', c3:'#ffaa44', core:'#1f0500', edge:'#ff9955' }
};

function shadeColor(c, p) {
  let n=parseInt(c.replace("#",""),16), a=Math.round(2.55*p);
  let R=Math.min(255,Math.max(0,(n>>16)+a)), G=Math.min(255,Math.max(0,(n>>8&0xFF)+a)), B=Math.min(255,Math.max(0,(n&0xFF)+a));
  return "#"+(0x1000000+R*0x10000+G*0x100+B).toString(16).slice(1);
}

/* ===== SKIN: Classic ===== */
function getClassicSVG(sides, color, size) {
  const vb=`viewBox="0 0 100 100"`, s=`style="width:${size}px;height:${size}px"`, sc=shadeColor;
  switch(sides) {
    case 4: return `<svg ${vb} ${s}><polygon points="50,8 8,92 92,92" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><polygon points="50,8 8,92 50,65" fill="${sc(color,10)}" opacity="0.3"/><polygon points="50,8 92,92 50,65" fill="${sc(color,-10)}" opacity="0.2"/></svg>`;
    case 6: return `<svg ${vb} ${s}><rect x="10" y="10" width="80" height="80" rx="8" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><rect x="10" y="10" width="80" height="40" rx="8" fill="${sc(color,15)}" opacity="0.3"/></svg>`;
    case 8: return `<svg ${vb} ${s}><polygon points="50,5 95,50 50,95 5,50" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><polygon points="50,5 95,50 50,50" fill="${sc(color,10)}" opacity="0.3"/><polygon points="50,5 5,50 50,50" fill="${sc(color,15)}" opacity="0.2"/></svg>`;
    case 10: return `<svg ${vb} ${s}><polygon points="50,5 90,35 78,90 22,90 10,35" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><polygon points="50,5 90,35 50,50 10,35" fill="${sc(color,15)}" opacity="0.3"/></svg>`;
    case 12: return `<svg ${vb} ${s}><polygon points="50,5 82,15 97,45 87,78 60,97 40,97 13,78 3,45 18,15" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><polygon points="50,5 82,15 97,45 50,50 3,45 18,15" fill="${sc(color,15)}" opacity="0.25"/></svg>`;
    case 20: return `<svg ${vb} ${s}><polygon points="50,3 82,18 95,50 82,82 50,97 18,82 5,50 18,18" fill="${color}" stroke="${sc(color,-25)}" stroke-width="2"/><polygon points="50,3 82,18 95,50 50,55 5,50 18,18" fill="${sc(color,15)}" opacity="0.3"/><polygon points="50,3 82,18 50,35 18,18" fill="${sc(color,20)}" opacity="0.15"/><polygon points="82,82 50,97 18,82 50,55" fill="${sc(color,-10)}" opacity="0.2"/></svg>`;
    case 100: return `<svg ${vb} ${s}><circle cx="50" cy="50" r="44" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/><ellipse cx="50" cy="38" rx="38" ry="28" fill="${sc(color,15)}" opacity="0.25"/></svg>`;
    default: return `<svg ${vb} ${s}><rect x="10" y="10" width="80" height="80" rx="8" fill="${color}" stroke="${sc(color,-20)}" stroke-width="2"/></svg>`;
  }
}

/* ===== SKIN: Crystal ===== */
function getCrystalSVG(sides, color, size) {
  const s=size, g=`cg${sides}`, ec=shadeColor(color,40)+'aa', dk=shadeColor(color,-30)+'66';
  switch(sides) {
    case 4: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><polygon points="50,8 8,92 92,92" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><polygon points="50,8 8,92 50,60" fill="url(#shine)" opacity="0.6"/><polygon points="50,8 92,92 50,60" fill="${dk}"/><line x1="50" y1="8" x2="50" y2="60" stroke="#fff" stroke-width="0.5" opacity="0.4"/><polygon points="50,8 8,92 92,92" fill="url(#innerGlow)"/><ellipse cx="38" cy="40" rx="10" ry="6" fill="#fff" opacity="0.15" transform="rotate(-30 38 40)"/></svg>`;
    case 6: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><rect x="10" y="10" width="80" height="80" rx="8" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><rect x="10" y="10" width="80" height="40" rx="8" fill="url(#shine)" opacity="0.5"/><rect x="10" y="10" width="80" height="80" rx="8" fill="url(#innerGlow)"/><ellipse cx="35" cy="32" rx="16" ry="10" fill="#fff" opacity="0.12" transform="rotate(-15 35 32)"/><rect x="12" y="12" width="30" height="20" rx="6" fill="#fff" opacity="0.08"/></svg>`;
    case 8: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><polygon points="50,5 95,50 50,95 5,50" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><polygon points="50,5 95,50 50,50" fill="url(#shine)" opacity="0.5"/><polygon points="5,50 50,95 50,50" fill="${dk}"/><line x1="50" y1="5" x2="50" y2="95" stroke="#fff" stroke-width="0.5" opacity="0.2"/><line x1="5" y1="50" x2="95" y2="50" stroke="#fff" stroke-width="0.5" opacity="0.15"/><polygon points="50,5 95,50 50,95 5,50" fill="url(#innerGlow)"/><ellipse cx="42" cy="35" rx="12" ry="8" fill="#fff" opacity="0.12" transform="rotate(-20 42 35)"/></svg>`;
    case 10: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><polygon points="50,5 90,35 78,90 22,90 10,35" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><polygon points="50,5 90,35 50,45 10,35" fill="url(#shine)" opacity="0.5"/><polygon points="90,35 78,90 50,45" fill="${dk}"/><line x1="50" y1="5" x2="50" y2="45" stroke="#fff" stroke-width="0.5" opacity="0.3"/><polygon points="50,5 90,35 78,90 22,90 10,35" fill="url(#innerGlow)"/><ellipse cx="40" cy="30" rx="12" ry="7" fill="#fff" opacity="0.12" transform="rotate(-25 40 30)"/></svg>`;
    case 12: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><polygon points="50,5 82,15 97,45 87,78 60,97 40,97 13,78 3,45 18,15" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><polygon points="50,5 82,15 97,45 50,50 3,45 18,15" fill="url(#shine)" opacity="0.45"/><polygon points="97,45 87,78 50,50" fill="${dk}"/><polygon points="13,78 40,97 60,97 87,78 50,50" fill="${dk}" opacity="0.5"/><polygon points="50,5 82,15 97,45 87,78 60,97 40,97 13,78 3,45 18,15" fill="url(#innerGlow)"/><ellipse cx="40" cy="28" rx="14" ry="8" fill="#fff" opacity="0.1" transform="rotate(-15 40 28)"/></svg>`;
    case 20: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><polygon points="50,3 82,18 95,50 82,82 50,97 18,82 5,50 18,18" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><polygon points="50,3 82,18 95,50 50,50 5,50 18,18" fill="url(#shine)" opacity="0.45"/><polygon points="50,3 82,18 50,35 18,18" fill="#fff" opacity="0.15"/><polygon points="82,18 95,50 50,50 50,35" fill="#fff" opacity="0.06"/><polygon points="5,50 18,82 50,50" fill="${dk}" opacity="0.4"/><polygon points="18,82 50,97 82,82 50,50" fill="${dk}" opacity="0.6"/><polygon points="95,50 82,82 50,50" fill="${dk}" opacity="0.3"/><line x1="50" y1="3" x2="50" y2="50" stroke="#fff" stroke-width="0.5" opacity="0.25"/><line x1="18" y1="18" x2="50" y2="50" stroke="#fff" stroke-width="0.3" opacity="0.15"/><line x1="82" y1="18" x2="50" y2="50" stroke="#fff" stroke-width="0.3" opacity="0.15"/><polygon points="50,3 82,18 95,50 82,82 50,97 18,82 5,50 18,18" fill="url(#innerGlow)"/><ellipse cx="38" cy="26" rx="14" ry="9" fill="#fff" opacity="0.12" transform="rotate(-20 38 26)"/><ellipse cx="30" cy="22" rx="5" ry="3" fill="#fff" opacity="0.2" transform="rotate(-30 30 22)"/></svg>`;
    case 100: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><circle cx="50" cy="50" r="44" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><ellipse cx="42" cy="38" rx="30" ry="22" fill="url(#shine)" opacity="0.4"/><circle cx="50" cy="50" r="44" fill="url(#innerGlow)"/><ellipse cx="36" cy="32" rx="12" ry="7" fill="#fff" opacity="0.15" transform="rotate(-20 36 32)"/><ellipse cx="32" cy="28" rx="4" ry="2.5" fill="#fff" opacity="0.25" transform="rotate(-30 32 28)"/></svg>`;
    default: return `<svg viewBox="0 0 100 100" style="width:${s}px;height:${s}px"><rect x="10" y="10" width="80" height="80" rx="8" fill="url(#${g})" stroke="${ec}" stroke-width="1.5"/><rect x="10" y="10" width="80" height="80" rx="8" fill="url(#innerGlow)"/></svg>`;
  }
}

/* ===== SKIN: Nebula ===== */
function getNebulaSVG(sides, color, size) {
  const id = nid++;
  const nc = nebulaColors[sides] || nebulaColors[100];
  const gid = `ng${id}`;
  const fid = `nf${id}`;
  const rgid = `nrg${id}`;

  const gradDefs = `
    <defs>
      <radialGradient id="${rgid}" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${nc.c3}" stop-opacity="0.95">
          <animate attributeName="stop-color" values="${nc.c3};${nc.c1};${nc.c3}" dur="3s" repeatCount="indefinite"/>
        </stop>
        <stop offset="35%" stop-color="${nc.c1}" stop-opacity="0.85">
          <animate attributeName="stop-color" values="${nc.c1};${nc.c2};${nc.c1}" dur="4s" repeatCount="indefinite"/>
        </stop>
        <stop offset="70%" stop-color="${nc.c2}" stop-opacity="0.9">
          <animate attributeName="stop-color" values="${nc.c2};${nc.core};${nc.c2}" dur="3.5s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="${nc.core}" stop-opacity="1">
          <animate attributeName="stop-opacity" values="1;0.85;1" dur="2.5s" repeatCount="indefinite"/>
        </stop>
      </radialGradient>
      <linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${nc.c3}" stop-opacity="0.9">
          <animate attributeName="stop-color" values="${nc.c3};${nc.c1};${nc.c3}" dur="2.8s" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" stop-color="${nc.c1}" stop-opacity="0.8">
          <animate attributeName="stop-color" values="${nc.c1};${nc.c2};${nc.c1}" dur="3.2s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="${nc.core}" stop-opacity="0.95"/>
      </linearGradient>
      <filter id="${fid}" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="${Math.floor(Math.random()*100)}">
          <animate attributeName="baseFrequency" values="0.03;0.06;0.03" dur="5s" repeatCount="indefinite"/>
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="6"/>
      </filter>
    </defs>`;

  const edgeStroke = nc.edge;
  const sz = `style="width:${size}px;height:${size}px"`;
  const vb = `viewBox="0 0 100 100"`;

  const coreOverlay = (shape) => {
    switch(shape) {
      case 'tri': return `<polygon points="50,30 30,75 70,75" fill="${nc.core}" opacity="0.4"/>`;
      case 'rect': return `<rect x="25" y="25" width="50" height="50" rx="4" fill="${nc.core}" opacity="0.35"/>`;
      case 'dia': return `<polygon points="50,20 80,50 50,80 20,50" fill="${nc.core}" opacity="0.35"/>`;
      case 'pent': return `<polygon points="50,20 75,40 65,70 35,70 25,40" fill="${nc.core}" opacity="0.35"/>`;
      case 'oct': return `<polygon points="50,18 72,25 85,48 78,72 55,85 45,85 22,72 15,48 28,25" fill="${nc.core}" opacity="0.3"/>`;
      case 'circle': return `<circle cx="50" cy="50" r="28" fill="${nc.core}" opacity="0.35"/>`;
      default: return `<polygon points="50,15 70,25 82,48 70,75 50,85 30,75 18,48 30,25" fill="${nc.core}" opacity="0.3"/>`;
    }
  };

  switch(sides) {
    case 4: return `<svg ${vb} ${sz}>${gradDefs}<polygon points="50,8 8,92 92,92" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><polygon points="50,8 8,92 92,92" fill="url(#${gid})" opacity="0.4"/>${coreOverlay('tri')}<polygon points="50,8 8,92 50,65" fill="${nc.c3}" opacity="0.15"/></svg>`;
    case 6: return `<svg ${vb} ${sz}>${gradDefs}<rect x="10" y="10" width="80" height="80" rx="8" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><rect x="10" y="10" width="80" height="80" rx="8" fill="url(#${gid})" opacity="0.35"/>${coreOverlay('rect')}</svg>`;
    case 8: return `<svg ${vb} ${sz}>${gradDefs}<polygon points="50,5 95,50 50,95 5,50" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><polygon points="50,5 95,50 50,95 5,50" fill="url(#${gid})" opacity="0.35"/>${coreOverlay('dia')}<polygon points="50,5 95,50 50,50" fill="${nc.c3}" opacity="0.1"/></svg>`;
    case 10: return `<svg ${vb} ${sz}>${gradDefs}<polygon points="50,5 90,35 78,90 22,90 10,35" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><polygon points="50,5 90,35 78,90 22,90 10,35" fill="url(#${gid})" opacity="0.35"/>${coreOverlay('pent')}</svg>`;
    case 12: return `<svg ${vb} ${sz}>${gradDefs}<polygon points="50,5 82,15 97,45 87,78 60,97 40,97 13,78 3,45 18,15" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><polygon points="50,5 82,15 97,45 87,78 60,97 40,97 13,78 3,45 18,15" fill="url(#${gid})" opacity="0.3"/>${coreOverlay('oct')}</svg>`;
    case 20: return `<svg ${vb} ${sz}>${gradDefs}<polygon points="50,3 82,18 95,50 82,82 50,97 18,82 5,50 18,18" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><polygon points="50,3 82,18 95,50 82,82 50,97 18,82 5,50 18,18" fill="url(#${gid})" opacity="0.3"/>${coreOverlay('default')}<polygon points="50,3 82,18 50,35 18,18" fill="${nc.c3}" opacity="0.12"/><polygon points="82,82 50,97 18,82 50,55" fill="${nc.core}" opacity="0.25"/></svg>`;
    case 100: return `<svg ${vb} ${sz}>${gradDefs}<circle cx="50" cy="50" r="44" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/><circle cx="50" cy="50" r="44" fill="url(#${gid})" opacity="0.35"/>${coreOverlay('circle')}</svg>`;
    default: return `<svg ${vb} ${sz}>${gradDefs}<rect x="10" y="10" width="80" height="80" rx="8" fill="url(#${rgid})" stroke="${edgeStroke}" stroke-width="2.5" filter="url(#${fid})"/></svg>`;
  }
}

/* ===== SVG Router ===== */
function getDieSVG(sides, color, size) {
  if (currentSkin === 'crystal') return getCrystalSVG(sides, color, size);
  if (currentSkin === 'nebula') return getNebulaSVG(sides, color, size);
  return getClassicSVG(sides, color, size);
}

/* ===== Particle Effects ===== */
function makeSparkles(sides) {
  if (currentSkin === 'crystal') return makeCrystalSparkles(sides);
  if (currentSkin === 'nebula') return makeNebulaSparks(sides);
  return '';
}

function makeCrystalSparkles(sides) {
  const lc = shadeColor(diceColors[sides]||'#607d8b', 50);
  let h='<div class="sparkle-container">';
  for(let i=0;i<6+Math.floor(Math.random()*4);i++){
    const x=15+Math.random()*70, y=15+Math.random()*70, dur=1.5+Math.random()*2, del=Math.random()*3, sz=2+Math.random()*3;
    h+=`<div class="sparkle" style="left:${x}%;top:${y}%;width:${sz}px;height:${sz}px;--dur:${dur}s;--delay:${del}s;background:${lc};box-shadow:0 0 ${sz*2}px ${lc}"></div>`;
  }
  return h+'</div>';
}

function makeNebulaSparks(sides) {
  const emberColors = ['#ff6600','#ff4400','#ffaa00','#ff8800','#ffcc33','#ff3300','#ffdd44','#ee5500'];
  const count = 8 + Math.floor(Math.random()*5);
  let h='<div class="ember-container">';
  for(let i=0;i<count;i++){
    const x = 10+Math.random()*80;
    const y = 30+Math.random()*60;
    const dur = 2+Math.random()*2.5;
    const del = Math.random()*4;
    const sz = 2+Math.random()*3;
    const drift = 20+Math.random()*30;
    const sway = -15+Math.random()*30;
    const col = emberColors[Math.floor(Math.random()*emberColors.length)];
    h+=`<div class="ember" style="left:${x}%;top:${y}%;width:${sz}px;height:${sz}px;--dur:${dur}s;--delay:${del}s;--drift:${drift}px;--sway:${sway}px;background:${col};box-shadow:0 0 ${sz*3}px ${col}, 0 0 ${sz*6}px ${col}88"></div>`;
  }
  return h+'</div>';
}
