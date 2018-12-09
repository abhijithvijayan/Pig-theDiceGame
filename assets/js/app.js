var scores, currentPlayer, currentScore;

var updateElement = (id, value) => {
  document.getElementById(id).textContent = value;
}

var resetQuery = (id, value) => {
  document.querySelector(id).textContent = value;
}

var removeClass = (id, value) => {
  document.querySelector(id).classList.remove(value);
}

var addClass = (id, value) => {
  document.querySelector(id).classList.add(value);
}

var display = (id, value) => {
  document.querySelector(id).style.display = value;
}

// initialization
var init = () => {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;

  display(".dice", "none");
  display(".roll-btn", "block");
  display(".hold-btn", "block");
  // reset everything

  updateElement("pScore-0", "0");
  updateElement("pScore-1", "0");
  updateElement("score-0", "0");
  updateElement("score-1", "0");

  resetQuery("#pName-0", "PLAYER 1");
  resetQuery("#pName-1", "PLAYER 2");

  removeClass(".player-0", "active");
  removeClass(".pCurrent-0", "current");
  removeClass(".player-1", "active");
  removeClass(".pCurrent-1", "current");

  //setting 1st player as active player
  addClass(".player-0", "active");
  addClass(".pCurrent-0", "current");
}

init();

// EVENT LISTENERS

// 1. NEW GAME BUTTON
document.querySelector(".new-btn").addEventListener("click", init); // this will call init()

// 2. ROLL BUTTON
document.querySelector(".roll-btn").addEventListener("click", () => {
  // 1. Random Number
  var diceNum = Math.floor(Math.random() * 6 + 1);

  // 2. Display
  var diceImg = document.querySelector(".dice");
  diceImg.src = "assets/img/dice-" + diceNum + ".png";
  diceImg.style.display = "block";

  // 3. Update if not 1
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.getElementById("score-" + currentPlayer).textContent = currentScore;
  } 
  else {
    playerSwitch();
  }
});

// 3. HOLD BUTTON
document.querySelector(".hold-btn").addEventListener("click", () => {
  // 1. Add score to total
  scores[currentPlayer] += currentScore;

  // 2. Update
  document.getElementById("pScore-" + currentPlayer).textContent = scores[currentPlayer];

  // 3. Check if player won
  if (scores[currentPlayer] >= 100) {
    document.querySelector("#pName-" + currentPlayer).textContent = "WINNER";
    // hide dice, roll button, hold button
    display(".dice", "none");
    display(".roll-btn", "none");
    display(".hold-btn", "none");
  } else {
    // 4. Switch Players
    playerSwitch();
  }
});

// Player Switch Function
var playerSwitch = () => {
  currentScore = 0;
  document.getElementById("score-" + currentPlayer).textContent = currentScore;

  // active class injection and removal
  document.querySelector(".player-" + currentPlayer).classList.toggle("active");
  document.querySelector(".pCurrent-" + currentPlayer).classList.remove("current"); // the block color

  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  document.querySelector(".player-" + currentPlayer).classList.toggle("active");
  document.querySelector(".pCurrent-" + currentPlayer).classList.add("current"); // the block color

  // hide the dice
  display(".dice", "none");
}

// OVERLAY MENU

document.querySelector(".overlay-btn").addEventListener("click", () => {
  display("#overlay", "block");
});
document.querySelector("#overlay").addEventListener("click", () => {
  display("#overlay", "none");
});
