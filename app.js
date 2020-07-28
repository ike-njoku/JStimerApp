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

// sound to play when the timer has executed
const audio = new Audio('/Alarm.mp3');


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

// create a timer class with methods/functions in it
class Timer {

    // add New -- create new timer
    addNew() {

        // validate input
        if (titleForm.value.length < 1) { window.alert('please ensure your timer has a title'); return; }
        if (parseInt(selectHrs.value + selectMin.value + selectSec.value) < 1) { window.alert('invalid time set'); return; }

        // define parameters
        this.title = titleForm.value;
        this.hours = selectHrs.value;
        this.minutes = selectMin.value;
        this.seconds = selectSec.value;

        this.timeLeft = this.hours + ':' + this.minutes + ':' + this.seconds;

        // convert the set time to milliseconds and store it in a variable to
        this.elapseTime = (this.hours * 60 * 60 * 1000) + (this.minutes * 60 * 1000) + (this.seconds * 1000);
        // set an expirey date for the timer
        let date = new Date();

        let expireyDate = date.toUTCString(date.setTime(date.getTime() + this.elapseTime));

        // create a cookie to store the title and expirey date of the countdown
        // the cookie would be read by the updateDisplay function and written to by the  tountDown function
        document.cookie = this.title + '=' + this.timeLeft + '; expires =' + expireyDate;

        // call the updateDisplay method/function to display the details of the countdown before starting the countdown
        this.updateDisplay();
        start = setInterval(() => {
            timer.countDown()
        }, 1000);

    }

    //  do the actual countdown
    countDown() {
        // get the hours and minutes and seconds from the timeleft
        // convert to numbers because the cookie saves them as strings
        this.hours = parseInt(this.timeLeft.split(':')[0]);
        this.minutes = parseInt(this.timeLeft.split(':')[1]);
        this.seconds = parseInt(this.timeLeft.split(':')[2]);

        // decrement the second
        this.seconds = this.seconds - 1;

        // set limits
        if (this.seconds < 1) {
            // decrease the minute


            this.minutes -= 1;
            if (this.hours == 0) this.minutes = 0;

            if (this.minutes < 0) this.minutes = 59;

            // return this.second to 59
            this.seconds = 59;

            // if the cookie has been depleted
            if (document.cookie == '') this.stop();
        }
        // redeclare the value of the time left (confer addNew())
        this.timeLeft = this.hours + ':' + this.minutes + ':' + this.seconds;

        let date = new Date();
        // subtract one second from the elapse time because this second is called every 1 second
        let expireyDate = date.toUTCString(date.setTime(date.getTime() + (this.elapseTime - 1000)));

        document.cookie = this.title + '=' + this.timeLeft + '; expires =' + expireyDate;

        // update the display
        this.updateDisplay();



    }



    // pause the countdown
    pause() {
        if (pauseButton.innerHTML == 'Pause') {
            pauseButton.innerHTML = 'Resume';
            clearInterval(start);
        } else {
            pauseButton.innerHTML = 'Pause';
            start = setInterval(() => {
                timer.countDown()
            }, 1000);
        }




    }




    // update the display
    updateDisplay() {
        //if a timer cookie is set,  display  the content of the cookie
        if (document.cookie.length) {
            // split the cookie to obtain the values
            // title
            this.title = document.cookie.split('=')[0];
            // set the time left to an empty array
            this.timeLeft = '';

            // split the time left to get this.hours, minutes and seconds
            let timeFormat = document.cookie.split('=')[1].split(':');

            timeFormat.map(i => {
                if (i.length < 2) i = '0' + i;

                // push the corrected time format into the timeLeft array

                // this would add a column at the  end of each item and would cause an extra column at the end of the time format
                this.timeLeft += i + ':';

            });




            // hide the addNew container
            addNewContainer.style.display = 'none';

            // display the countdownTimerContainer(which contains the screen , confer index.html )
            countDownContainer.style.display = 'grid';

            // remove the extra column at the end of the time format

            this.timeLeft = this.timeLeft.slice(0, -1);

            displayScreen.innerHTML = this.timeLeft;
            titleDisplay.innerHTML = this.title;


        } else {

            // reset the values input parameters
            titleForm.value = '';
            selectHrs.value = 0;
            selectMin.value = 0;
            selectSec.value = 0;

            // hide the countDown Timer Display
            addNewContainer.style.display = 'grid';
            countDownContainer.style.display = 'none';
        }


    }

    // stop the countdown
    stop(restart) {
        // play a sound if the timer was completed or the stop button clicked rather thatn the restart button
        if (!restart) audio.play();


        // make the cookie expire
        this.elapseTime = -50000;
        let date = new Date();
        let expireyDate = date.toUTCString(date.setTime(date.getTime() + this.elapseTime));
        document.cookie = this.title + '=' + this.timeLeft + '; expires =' + expireyDate;


        clearInterval(start);



        // output (set set a time out so that it will display after the alarm)
        if (!restart) {
            setTimeout(() => {
                window.alert('count down completed for  ' + this.title);

            }, 700);
        }

        // call the update display method/function to hide the countdown container;

        if (restart) {
            this.title = titleForm.value;
            this.hours = selectHrs.value;
            this.minutes = selectMin.value;
            this.seconds = selectSec.value;

            this.addNew();
        }

        this.updateDisplay();
    }


}


// attach functions
// create an instance of the timer class
const timer = new Timer();

var start;

// startButton
startButton.addEventListener('click', () => timer.addNew());

// pause Button
pauseButton.addEventListener('click', () => timer.pause());


// stop button
stopBotton.addEventListener('click', () => timer.stop());

// restart button (pass a parameter to the stop method and decide which actions to take in the stop function)
restartButton.addEventListener('click', function() {
    let restart = true;
    timer.stop(restart)
});


// if the window was closed and reopened, continue the countdown from where it stopped
if (document.cookie) {
    timer.updateDisplay();
    start = setInterval(() => {
        timer.countDown()
    }, 1000);

}