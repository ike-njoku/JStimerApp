// timer.js

// define constants

// countDownContainer
const countDownContainer = document.querySelector('[data-countDownContainer]');
// addNew container
const addNewContainer = document.querySelector('[data-addNew]');

// start Button
const startButton = document.querySelector('[data-start]');
// pause Button
const pauseButton = document.querySelector('[data-pause]');
// stop Button
const stopBotton = document.querySelector('[data-stop]');
// restart timer button
const restartButton = document.querySelector('[data-restart]');

// input (add timerTitle)
const titleForm = document.querySelector('[data-titleForm]');

// select hours
const selectHrs = document.querySelector('[data-selectHrs]');

// select minutes
const selectMin = document.querySelector('[data-selectMin]');

// generally select timeSetters
const timesetters = document.querySelectorAll('[data-setTime]');

// select seconds
const selectSec = document.querySelector('[data-selectSec]');



// dynamically generate number of seconds and minutes (1-60)
timesetters.forEach(timeSetter => {
    // 60 represents seconds and minutes
    let limit = 60;
    // set parameters

    for (let i = 0; i < limit; i++) {
        // increment the value of the next option

        // create an option tag
        let createOption = document.createElement('option');

        // add content innerHtml to th option created
        createOption.innerText = i;

        // create a value attribute for each option tag
        createOption.setAttribute('value', i);

        // append the  option tag to the timesetter
        timeSetter.appendChild(createOption);

    }

});


//hide countdownContainer by default
// countDownContainer.style.display = 'none';

// dynamically create hours, minutes and secnds


// create the timer class that contains all timer methods
class Timer {
    constructor() {}
        // reset the counter parameters/display parameters

    // add new event
    addNew() {}

    // restart countdown
    restart() {}


    // start a new countDown/Timer
    start() {}

    // pause the countdown/timer
    pause() {}

    // stop/cancel the running timer/countdown
    stop() {}

    // update the display
    updateDisplay() {}


}

const timer = new Timer();

// attach functions

// startButton
startButton.addEventListener('click', function validateInput(title) {
    title = titleForm.value;
    hours = selectHrs.value;
    minutes = selectMin.value;
    seconds = selectSec.value;
    if (title) timer.addNew(title, hours, minutes, seconds);
    else window.alert('please add a title to your reminder');
})