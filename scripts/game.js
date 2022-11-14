let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
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
                /*
                If click before game started:
                Only accept a click if the length of the currentGame array is greater than zero.  
                That way we know we have a game in progress.
                Store the  move in game.lastButton
                */
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }

    // start a new game...
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
Computer's game is in progress...
Function to set this interval turning the lightsOn,  
incrementing the game turnNumber, and then turning them off again
*/
function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

/*
Get the index of the last element from our playerMoves array.  
to compare that with the same index in the current game array,  
if our player gets the answers correct then these two should match.
Means that we can  just compare elements at the same index number.  
Inside our if-statement then, if the length of  our current game array is equal to the length  
of our player moves, then we must be at the end of  the sequence. And the player got them all correct.
So now, we increment  the score and to add a new turn.
So increment it, we show the  score and we'll add a new turn.
*/
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if  (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };