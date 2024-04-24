let correctGuesses = 0;
let totalGuesses = 0;
let selectedSound = '';
let notRun = true;
let soundplayed = false;
let breakSubmit = false;
// Define variables for each audio file URL
const audio1_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Octave+(up).mp3';
const audio2_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Octave+(down).mp3';
const audio3_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Perfect+4th+(up).mp3';
const audio4_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Perfect+4th+(down).mp3';
const audio5_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Perfect+5th+(up).mp3';
const audio6_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Perfect+5th+(down).mp3';
// level 2 sounds
const audio7_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Maj+3rd+(up).mp3';
const audio8_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Maj+3rd+(down).mp3';
const audio9_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Minor+3rd+(up).mp3';
const audio10_mp3 = 'https://ear--training.s3.us-west-1.amazonaws.com/Minor+3rd+(down).mp3';

// Create the sounds array using the variables
const sounds = [audio1_mp3, audio2_mp3, audio7_mp3, audio8_mp3, audio9_mp3, audio10_mp3];

const sounds2 = [audio1_mp3, audio2_mp3, audio3_mp3, audio4_mp3, audio5_mp3, audio6_mp3, audio7_mp3, audio8_mp3, audio9_mp3, audio10_mp3];

// set play button to trigger playSound function
const audio = document.getElementById('sound');
audio.addEventListener('click',playSound)

function playSound() {
    // if no sound is selected play a random sound
    if (!selectedSound) {
        if (document.getElementById("guess5")) {
            let randomIndex = Math.floor(Math.random() * (sounds2.length));
            selectedSound = sounds2[randomIndex]
            audio.src = selectedSound;
        
        } else {
            let randomIndex = Math.floor(Math.random() * (sounds.length));
            selectedSound = sounds[randomIndex];
            audio.src = selectedSound; 
        }
    }
    // Play the selected sound
    audio.play();
    // Now user can guess
    soundplayed = true;
    // don't let submit until checkGuess is made
    //breakSubmit = false;
    
}
    
function submitGuess() {
    // User can't guess until sound is heard
    if (soundplayed && notRun && totalGuesses < 11) {
    // Get the selected value from the radio buttons
    let selectedValue = document.querySelector('input[name="guess"]:checked').value;

    // Call the checkGuess() function and pass the selected value
    checkGuess(selectedValue);
    }
}

function checkGuess(selectedValue) {
    let correctAnswer= "";
    
    switch (selectedSound) {
        case audio1_mp3:
        case audio2_mp3:
            correctAnswer = 'Octave';
            break;
        
        case audio3_mp3:
        case audio4_mp3:
            correctAnswer = 'Perfect 4th';
            break;
    
        case audio5_mp3:
        case audio6_mp3:
            correctAnswer = 'Perfect 5th';
            break;

        case audio7_mp3:
        case audio8_mp3:
            correctAnswer = 'Major 3rd';
            break;

        case audio9_mp3:
        case audio10_mp3:
            correctAnswer = 'Minor 3rd';
            break;

        
    }
        // only allow 1 guess per turn
    if (notRun) {

        totalGuesses++;
        
        // Check if the guess matches the correct answer
        let isCorrect = (selectedValue === correctAnswer);

        let resltDiv = document.getElementById("result");
        resltDiv.textContent = isCorrect ? "Correct" : "Incorrect";

        let Answer = document.getElementById("Answer");
        Answer.textContent = correctAnswer;

        // Update the score
        if (isCorrect) {
            correctGuesses++;
        }
        updateScore();

        // Prevent checkGuess from being repeated more than once a turn
        notRun = false;
        // now user can submit
        breakSubmit = true;

        generateGraphic(isCorrect);
        
}

function generateGraphic(isCorrect) {
    let correctImage = document.getElementById("correctImage");
    let incorrectImage = document.getElementById("incorrectImage");
    if (isCorrect) {
        correctImage.style.display = "block";
        incorrectImage.style.display = "none";
    } else {
        correctImage.style.display = "none";
        incorrectImage.style.display = "block";
    }
}

}

function resetSubmit(){
    // Make sure guess has been submited 1st before user can reset 
    if (notRun === false && breakSubmit) {
    // Prevent user from guessing before playing sound
    soundplayed = false;
    // Allow checkguess to be made once sound is done
    notRun = true;
    // trigger new sound until turn limit reached
    if (totalGuesses < 10){
    // Allow playSound to be asigned new random sound
    selectedSound = '';
    playSound();
    clearDisplay();
    }
    // clear graphic and Answer display
    
    if (totalGuesses === 10){
        endGame();
    }
    
}

}

function updateScore() {
    let percentage = (correctGuesses / totalGuesses) * 100;
    if (totalGuesses === 0) {
        document.getElementById('percentage').textContent = 0 + '%';
    } else {
    document.getElementById('percentage').textContent = percentage.toFixed(2) + '%'; 
}
    let scoreDisplay = document.getElementById("score_display");
    scoreDisplay.textContent = correctGuesses.toString() + "/" + totalGuesses.toString();
}

function clearDisplay() {
    // clear answer display 
    let Answer = document.getElementById("Answer");
    Answer.textContent = '';
    // clear image display 
    let correctImage = document.getElementById("correctImage");
    let incorrectImage = document.getElementById("incorrectImage");
    correctImage.style.display = "none";
    incorrectImage.style.display = "none";

}

function endGame() {
    // print percent to reuslt percent id
    let percentage = (correctGuesses / totalGuesses) * 100;
    document.getElementById('resultPercent').textContent = percentage.toFixed(2) + '%';

    // print score to resultScore id
    let scoreDisplay = document.getElementById('resultScore');
    scoreDisplay.textContent = correctGuesses.toString() + "/" + totalGuesses.toString();

    // determine if pass / try again
    if (correctGuesses >= 7) {
        document.getElementById('resultPassFail').textContent = "Pass"
        let nextLevel = document.getElementById('level2');
        nextLevel.style.display = 'block';
        let retry = document.getElementById('retry');
        retry.style.display = 'none';
    } else {document.getElementById('resultPassFail').textContent = "Keep Trying"
        let retry = document.getElementById('retry');
        retry.style.display = 'block';
        let nextLevel = document.getElementById('level2');
        nextLevel.style.display = 'none';
}

    showResultsWindow();

    }

function showResultsWindow() {
    let resultsWindow = document.getElementById('resultsWindow')
    resultsWindow.style.display = 'block'; 
}

function gameReset () {
    // remove results window
    let resultsWindow = document.getElementById('resultsWindow')
    resultsWindow.style.display = 'none'; 
    // reset totalGuesses
    totalGuesses = 0;
    // reset correctGuesses
    correctGuesses = 0; 
    // begin with clear slate
    clearDisplay();
    updateScore();
    // reset and play sound
    selectedSound = '';
    playSound();

    

}