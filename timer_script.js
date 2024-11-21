document.addEventListener("DOMContentLoaded", () => {
    let calculateButton = document.getElementById('calculate-button');
    let defectsInput = document.getElementById('defects-input');
    //let alarmSound = document.getElementById('alarm-sound');
    let audio = new Audio("alarm.mp3");
    let port;
    let connectButton = document.getElementById('connect-button');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;

    
    //Button to connect to the Arduino. Will activate the function in the HTML to clear the Arduino's counter and begin counting for the next round.
    connectButton.addEventListener('click', async function () {
        if (port) {
        port.close();
        port = undefined;
        }
        else {
        startCounting();
        }
    });


    function countDown(duration){
        let time = duration
        localStorage.setItem("time",duration);

        // Countdown timer from 2 minutes, runs code every 1000 milliseconds / 1 second.
        let timer = setInterval(() => {
            let minutes = parseInt((time / 60), 10);                                            // parseInt to get the first int value
            let seconds = parseInt((time % 60), 10).toString().padStart(2, "0");                // Will display the seconds as 09 instead of 9, If second is 10, will remain 10
            document.getElementById("timer-display").textContent = `${minutes}:${seconds}`;


            // Decrement timer
            time--;

            //Stores the remaining time for the Arduino to know that the round is still active.
            localStorage.setItem("time",time);
            
            // If time is less than 0, stop the timer and alert user.
            if(time < 0){
                clearInterval(timer);
                audio.play();                                                                   // Play the alarm audio
                alert("Time is up!");

                //After clicking ok on the alert, pause the audio
                if(alert){
                    audio.pause();
                }


                // Display the defects input once the timer is up
                document.getElementById('defects').style.display = 'block';
            }
        }, 1000);
    }


    // Count down from 120 seconds, 2 minutes
    countDown(120);


    // Clicking the calculate button takes user to the metric page
    calculateButton.addEventListener('click', () => {
        let defects = parseInt(defectsInput.value, 10);
        localStorage.setItem('defects', defects);               // Store the defects value in the defects input field onto the local web browser storage for calculation


        const planString = localStorage.getItem('plan');
        const plan = parseInt(planString, 10);
        const total = localStorage.getItem("total"); //Stores the final value that was read from the Arduino.
        const actual = total - defects;
        const delta = actual - plan;
        

        // Object to store data for the current round
        const roundData = {
            round: currentRound,
            plan: plan,
            total: total,
            defects: defects,
            actual: actual,
            delta: delta
        };


        let allRoundsData = JSON.parse(localStorage.getItem('allRoundsData')) || [];
        allRoundsData[currentRound - 1] = roundData;                                  
        allRoundsData.push(roundData);
        localStorage.setItem('allRoundsData', JSON.stringify(allRoundsData));
       


        // Saves the value of total, actual, and delta
        // localStorage.setItem('total', total);
        // localStorage.setItem('actual', actual);
        // localStorage.setItem('delta', delta);


        window.location.href = 'metric.html';                   // Redirects users to the metric.html page
    });


});


