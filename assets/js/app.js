var scores, currentPlayer, currentScore;

// initialization
var init = () => {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;

  // hide dice
  document.querySelector(".dice").style.display = "none";
  // reset everything
  document.getElementById("pScore-0").textContent = "0";
  document.getElementById("pScore-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.querySelector("#pName-0").textContent = "PLAYER 1";
  document.querySelector("#pName-1").textContent = "PLAYER 2";
  document.querySelector(".player-0").classList.remove("active");
  document.querySelector(".pCurrent-0").classList.remove("current");
  document.querySelector(".player-1").classList.remove("active");
  document.querySelector(".pCurrent-1").classList.remove("current");
  //setting 1st player as active player
  document.querySelector(".player-0").classList.add("active");
  document.querySelector(".pCurrent-0").classList.add("current");
  // show buttons
  document.querySelector(".roll-btn").style.display = "block";
  document.querySelector(".hold-btn").style.display = "block";
}
init();

// EVENT LISTENERS

// 1. NEW GAME BUTTON
document.querySelector(".new-btn").addEventListener("click", init); // this will call init()

// 2. ROLL BUTTON
document.querySelector(".roll-btn").addEventListener("click", () => {
  //anonymous fn - that cannot be reused
  // 1. Random Number
  var diceNum = Math.floor(Math.random() * 6 + 1);

  // 2. Display
  var diceImg = document.querySelector(".dice");
  diceImg.src = "assets/img/dice-" + diceNum + ".png";
  diceImg.style.display = "block";

  // 3. Update if not 1
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.getElementById(
      "score-" + currentPlayer
    ).textContent = currentScore;
  } else {
    playerSwitch();
  }
});

// 3. HOLD BUTTON
document.querySelector(".hold-btn").addEventListener("click", () => {
  // 1. Add score to total
  scores[currentPlayer] += currentScore;

  // 2. Update
  document.getElementById("pScore-" + currentPlayer).textContent =
    scores[currentPlayer];

  // 3. Check if player won
  if (scores[currentPlayer] >= 100) {
    document.querySelector("#pName-" + currentPlayer).textContent = "WINNER";
    // hide dice, roll button, hold button
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".roll-btn").style.display = "none";
    document.querySelector(".hold-btn").style.display = "none";
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
  document.querySelector(".dice").style.display = "none";
}

// OVERLAY MENU
var overlaySwitch = value => {
  // eq. to : var overlaySwitch = function(value)
  if (value) {
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("overlay").style.display = "none";
  }
}

document.querySelector(".overlay-btn").addEventListener("click", () => {
  overlaySwitch(1);
});
document.querySelector("#overlay").addEventListener("click", () => {
  overlaySwitch(0);
});
