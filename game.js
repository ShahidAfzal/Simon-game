let level = 0;
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];


$(".btn").click(function() {
    // Get the ID of the clicked button
    const buttonId = $(this).attr("id");

    // Call a handler function with the button ID as the argument
    buttonClickHandler(buttonId);
    animatePress(buttonId);
    checkAnswer(userClickedPattern.length -1);
});

let gameStarted = false;

document.addEventListener('keydown', function(){
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
    
})


// Add this to your existing game.js
$(document).ready(() => {
    // Instructions modal functionality
    $('.instructions-btn').click(() => {
        $('.instructions').addClass('show');
    });

    $('.close-instructions').click(() => {
        $('.instructions').removeClass('show');
    });

    // Close modal when clicking outside
    $(document).click((e) => {
        if ($(e.target).hasClass('instructions')) {
            $('.instructions').removeClass('show');
        }
    });

    // Enable touch start for mobile
    $(document).on('touchstart', (e) => {
        if (!gameStarted) {
            startGame();
        }
    });
});

function updateScore() {
    const currentScore = level - 1; // Calculate the current score
    currentScore >= 0 ? currentScore : 0; // Ensure the score is not negative
    document.querySelector('.score').innerText = `Score: ${currentScore}`;
    
    // Fetch existing high score from localStorage
    let storedHighScore = localStorage.getItem('highScore');
    storedHighScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;

    // Check if the current score is greater than the stored high score
    if (currentScore > storedHighScore) {
        localStorage.setItem('highScore', currentScore); // Update localStorage
        storedHighScore = currentScore; // Update high score in memory
    }

    // Update highest score in the UI
    document.querySelector('.highest-score').innerText = `Highest Score: ${storedHighScore}`;
}



function nextSequence() {
    level ++
    document.querySelector('h1').innerText = `Level ${level}`;

    const randomNumber = Math.floor(Math.random() * 4); // Generate a random index between 0 and 3
    let randomChosenColor = buttonColors[randomNumber]; // Get the color based on the random index
    gamePattern.push(randomChosenColor); // Add the chosen color to the game pattern array

    // console.log(gamePattern); // Optional: log the entire pattern to see the sequence
    playSound(randomChosenColor);
    // Optionally, you can animate or highlight the button (example):
    animatePress(randomChosenColor);
    updateScore();
    

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        } 
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')        
        }, 200);
        document.querySelector('h1').innerText = `Game Over, Press Any Key to Restart`; 
        startOver();   
    }
}

// Detect click on any button


// Handler function
function buttonClickHandler(buttonId) {
    // console.log("Button " + buttonId + " clicked!");
    let userChoosenColor = buttonId;
    userClickedPattern.push(userChoosenColor);

    // Optionally, you can add other behavior based on the button clicked
    // For example, play the sound associated with the button:
    playSound(buttonId);
}

function playSound(color) {
    let sound = new Audio('/sounds/' + color + '.mp3');
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // Adds the "clicked" class to the button
    

    setTimeout(function(){
        $("#" + currentColor).removeClass('pressed');
    }, 100);
    
}

function startOver() {
    updateScore();
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}




