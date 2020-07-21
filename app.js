// timer.js



// define constants

// countDownContainer
const countDownContainer = document.querySelector('[data-countDownContainer]');

// restart timer button
const restartButton = document.querySelector('[data-restart]');









// create the timer class that contains all timer methods
class Timer {
    constructor() {}
        // reset the counter parameters/display parameters

    // add new event
    addNew() {}

    restart() {
        window.alert('hello world');
    }

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

restartButton.addEventListener('click', () => timer.restart());

//hide countdownContainer by default
countDownContainer.style.display = 'none';