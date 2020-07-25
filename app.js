// timer.js

// define constants

// countDownContainer
const countDownContainer = document.querySelector('[data-countDownContainer]');
// addNew container
const addNewContainer = document.querySelector('[data-addNew]');

// display screen
const displayScreen = document.querySelector('[data-screen]');

// display title countdown timer
const titleDisplay = document.querySelector('[data-title]');

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

// set the time interval
var timeInterval = 1000;



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
countDownContainer.style.display = 'none';


// dynamically create hours, minutes and secnds


// create the timer class that contains all timer methods
class Timer {

    // reset the counter parameters/display parameters


    // start a new countDown/Timer
    countDown(hours, minutes, seconds) {
        this.hours = parseInt(hours);
        this.minutes = parseInt(minutes);
        this.seconds = parseInt(seconds);

        //subtract one from the second
        this.seconds = this.seconds - 1;

        // set limits
        if (this.seconds < 1) {

            this.minutes = this.minutes - 1;
            this.seconds = 59;
            if (this.minutes < 1) {
                this.hours = this.hours - 1;
                this.minutes = 59;
            }

        }


        // if (this.hours == -1) {
        //     this.hours = 0;
        //     this.minutes = 0;
        //     this.seconds = 0;
        // }


        // convert the hours and minutes and seconds back to strings so that
        // it can be processed (confer this.updateDisplay)
        this.seconds = this.seconds.toString();
        this.minutes = this.minutes.toString();
        this.hours = this.hours.toString();




        // if the countdown has reached Zero
        this.updateDisplay(this.hours, this.minutes, this.seconds);




        // else this.stop();


    }



    // pause the countdown/timer
    pause() {}


    // stop/cancel the running timer/countdown
    stop() {
        window.alert(titleForm.value);
        // timeInterval = -1000;
    }

    // update the display
    updateDisplay(hours, minutes, seconds) {

        // if these parameters are passed from the click of the start button
        if (hours, minutes, seconds) {

            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
        }

        // using an array add zeroes befor each number if the number length is less than 2 (ie 00:00:00)
        // create a timeformat array who's content will be displayed;
        let updatedTimeFormat = [];

        let rawTimeFormat = [this.hours, this.minutes, this.seconds];
        rawTimeFormat.map((timeItem) => {
            if (timeItem.length < 2) timeItem = '0' + timeItem;
            // push the new timeItem into the updated timeformat array
            updatedTimeFormat.push(timeItem);
        });



        // display the title on the top of the countdown timer screen
        titleDisplay.innerHTML = titleForm.value;


        // reasign the parameters
        this.hours = updatedTimeFormat[0];
        this.minutes = updatedTimeFormat[1];
        this.seconds = updatedTimeFormat[2];


        // display the time;
        displayScreen.innerHTML = this.hours + ':' + this.minutes + ':' + this.seconds;

        // hide the addNew container
        addNewContainer.style.display = 'none';

    }


}

const timer = new Timer();

// attach functions


// validateInput function( called by start and restart button clicks)
const validateInput = function(title) {
    title = titleForm.value;
    hours = selectHrs.value;
    minutes = selectMin.value;
    seconds = selectSec.value;


    if (title) {
        timer.updateDisplay(hours, minutes, seconds);
        countDownContainer.style.display = 'grid';
        // srtart the timer if the screen is countDown screen is displayed

        if (countDownContainer.style.display == 'grid') {
            setInterval(() => {
                timer.countDown(timer.hours, timer.minutes, timer.seconds);
            }, timeInterval);
        }
    } else window.alert('please add a title to your reminder');
};




// startButton
startButton.addEventListener('click', () => validateInput());
// restart
restartButton.addEventListener('click', () => validateInput());