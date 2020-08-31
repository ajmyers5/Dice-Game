/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*    PSEUDO CODE manipulating DOM for practice

      get random #
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// "setter" - bec we "set" a value.
// document.querySelector("#current-" + activePlayer).textContent = dice;
// use this to manipulate innerHTML NOT just the content.
// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

// "getter" - bec we "get" a value.
// var x = document.querySelector("#score-0").textContent;
   console.log(x);
*/

// setting up variables
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. need random #
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display result that is also tied to correct # and img
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update round score IF the rolled number was NOT 1

    if (dice !== 1) {
      //Add score
      roundScore += dice; // same as writing roundScore = roundScore + dice
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player -> use ternary operator!
      nextPlayer();
    }
  }
});

// adjusting game so HOLD BTN functions
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; // same as scores[activePlayer] = scores[activePlayer] + roundScore;

    // 2. Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // 3. check if player won game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
      // trying to remove the "winner" css shit
      // document
      //   .querySelector(".player-" + activePlayer + "-panel")
      //   .classList.remove("winner");
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player -> use ternary operator!
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //remove/add class
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");
  // HOWEVER -> we can simply use TOGGLE on both classes
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // setting dice img to 'none'
  document.querySelector(".dice").style.display = "none";

  // instead of using querySelector, we can also use getElementById
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // removing WINNER css properties on new game start from both players
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  // removing ACTIVE status
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  // add back ACTIVE status to player 1
  document.querySelector(".player-0-panel").classList.add("active");
}
