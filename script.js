document.getElementById('deal-btn').addEventListener('click', dealCards);

let player1Score = 0;
let player2Score = 0;

function dealCards() {
  const card1 = Math.floor(Math.random() * 13) + 1; // Random card value between 1 and 13
  const card2 = Math.floor(Math.random() * 13) + 1;
  const card3 = Math.floor(Math.random() * 13) + 1;

  document.getElementById('card1').innerText = `牌1: ${card1}`;
  document.getElementById('card2').innerText = `牌2: ${card2}`;
  document.getElementById('card3').innerText = `牌3: ${card3}`;

  // Determine winner based on card values
  const result = calculateWinner(card1, card2, card3);
  document.getElementById('result').innerText = result;
}

function calculateWinner(card1, card2, card3) {
  if ((card3 > card1 && card3 < card2) || (card3 < card1 && card3 > card2)) {
    player1Score += 100;
    return '玩家1贏';
  } else if (card3 === card1 || card3 === card2) {
    player1Score += 200;
    return '玩家1撞柱';
  } else {
    player2Score += 100;
    return '玩家2贏';
  }
}
