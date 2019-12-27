/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
                                     // state variable
var scores,  roundScore,  activePlayer, gamePlaying, previousRolls, winScore;

init();

console.log( document.querySelector('.player-0-panel').classList);


   // type coercion results in either current-0 or 1 based on activePlayer
//document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' // innerHTML only accepts a string

// Reading text from a page via JavaScript
// var x = document.querySelector('#score-1').textContent;
// console.log(x);

// function button() {
    
// }

// Event listener with function callback (btn)
// document.querySelector('.btn-roll').addEventListener('click', btn);


// Anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Set dice to random # 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1); console.log(dice2);
        // 2. Display result
        document.querySelector('.dice1').style.display = 'block';
        document.querySelector('.dice2').style.display = 'block';


        document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was not a 1
        if ( (dice1 === 6 && dice1 === previousRolls[0])
            || (dice2 === 6 && dice2 === previousRolls[0])
            || (dice1 === 6 && dice1 === previousRolls[1])
            || (dice2 === 6 && dice2 === previousRolls[1])) {
                nextPlayer();
                console.log('Rolled a 6 twice in a row');
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += (dice1 + dice2);
            previousRolls[0] = dice1;
            previousRolls[1] = dice2;
            // Update current score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        }
        else {
            console.log('Rolled a 1');
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
                // Add current score to global score
                scores[activePlayer] += roundScore;

                // Update UI 
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
                // Check if the player won the game
                if (scores[activePlayer] >= winScore) {
                    console.log('Player ' + (activePlayer + 1) + ' won!');
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.querySelector('.dice1').style.display = 'none';
                    document.querySelector('.dice2').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('.winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.active');
                    gamePlaying = false;
                }
                else {
                    nextPlayer();
                }
    }  
});
// we don't include parentheses in the function parameter because function will immediately be called
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0,0]; activePlayer = 0; roundScore = 0; previousRolls = [0,0]; gamePlaying = true; 
    winScore = Number(document.getElementById("win").value);
    if (winScore === 0) {
        winScore = 100;
    }
    
    document.getElementById("score-form").classList.toggle('hide');

    // console.log(winScore, typeof winScore);
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // we remove any active states from the panels to prevent duplicating classes
    // and then add it back to Player 1's panel to make it the active player
    // when a new game starts.
    document.querySelector('.player-0-panel').classList.add('active');
}



function nextPlayer() {
     // If active player gets a 1, switch to new player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     // Reset round score
     roundScore = 0;  
     
     previousRolls = [0,0];

     // Reset current scores when turn changes
     document.getElementById('current-0').textContent = 0;
     document.getElementById('current-1').textContent = 0;

     // '.active' class sets styles for the active player. 

     // classList is an object that returns the classes associated with an element.
     // When we query a selector, classList returns an array that includes the queried class and its sibling classes.
     // document.querySelector('.player-0-panel').classList.remove('active');
     // document.querySelector('.player-1-panel').classList.add('active');


     // The toggle function will add the class if it doesn't exist;
     // if it does exist the class will be removed from the element.
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
 
     // Hide the die by setting display to none
     document.querySelector('.dice1').style.display='none';
     document.querySelector('.dice2').style.display='none';
}