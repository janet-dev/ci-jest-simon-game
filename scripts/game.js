let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"],
}

/*
The new game function resets everything, but  
it doesn't actually start a new game. For this, we  need to call our showScore 
and addTurn functions.  

*/
function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];

    // for circle of circles...
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                let move = e.target.getAttribute("id");
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            });
            circle.setAttribute("data-listener", "true");
        }
    }

    showScore();
    addTurn();
}

/*
Firstly, it needs to clear the playerMoves  array, because this is the start of a new turn.
Secondly, it needs to randomly select one of  the available choices, from our game.choices  
key and push that into the  computer sequence array.
Finally, we need to call the showTurns  function to display the sequence.

*/
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns()
}

/*
Function gets the element with the ID of 'score'  
and sets its inner text to game.score
*/
function showScore() {
    document.getElementById("score").innerText = game.score;
} 

/*
Going to call the lightsOn  function with the ID of one of our circles,  
so we're going to refer to this  inside of the function as 'circ'.
The class of light will then be added to our  appropriate circle. So what we're going to do  
is get the element with the ID of the circle  that we passed in add the 'light' class.
And then, we're going to use JavaScript's set  timeout function to remove this class after 400  
milliseconds
*/
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

/*
Function to set this interval turning the lightsOn,  
incrementing the game turnNumber, and then turning them off again
*/
function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800)
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };