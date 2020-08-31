/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// setting up variables
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. need random #
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display result that is also tied to correct # and img
    // var diceDOM = document.querySelector(".dice");
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. update round score IF the rolled number was NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2; // same as writing roundScore = roundScore + dice
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player -> use ternary operator!
      nextPlayer();
    }
    /* 
    if (dice === 6 && lastDice === 6) {
      //player loses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice; // same as writing roundScore = roundScore + dice
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player -> use ternary operator!
      nextPlayer();
    }
    lastDice = dice;
    */
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

    var finalScoreInput = document.querySelector(".final-score").value;
    var winningScore;
    // console.log(finalScoreInput);
    // undefined, 0, null, or empty string ("") are COERCED to false
    // anything else is COERCED to true
    if (finalScoreInput) {
      winningScore = finalScoreInput;
    } else {
      winningScore = 100;
    }

    // 3. check if player won game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
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

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // setting dice img to 'none'
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

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

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
