document.addEventListener("DOMContentLoaded", () => {
    let calculateButton = document.getElementById('calculate-button');
    let defectsInput = document.getElementById('defects-input');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;

    function countDown(duration){
        let time = duration

        // Countdown timer from 2 minutes, runs code every 1000 milliseconds / 1 second.
        let timer = setInterval(() => {
            let minutes = parseInt((time / 60), 10);                                            // parseInt to get the first int value
            let seconds = parseInt((time % 60), 10).toString().padStart(2, "0");                // Will display the seconds as 09 instead of 9, If second is 10, will remain 10
            document.getElementById("timer-display").textContent = `${minutes}:${seconds}`;

            // Decrement timer
            time--; 

            // If time is less than 0, stop the timer and alert user.
            if(time < 0){
                clearInterval(timer);
                alert("Time is up!")

                // Display the defects input once the timer is up
                document.getElementById('defects').style.display = 'block';
            }
        }, 1000);
    }

    // Count down from 120 seconds, 2 minutes
    countDown(2);

    // Clicking the calculate button takes user to the metric page
    calculateButton.addEventListener('click', () => {
        let defects = defectsInput.value;
        localStorage.setItem('defects', defects);          // Store the defects value in the defects input field onto the local web browser storage for calculation

        const plan = localStorage.getItem('plan');
        const total = plan;                                     // The value of total is a place holder for now, real value of total should come from arduino
        const actual = total - defects;
        const delta = actual - plan;

        /*
        const roundData = {
            round: currentRound,
            plan: plan,
            total: total,
            defects: defects,
            actual: actual,
            delta: delta
        };

        let allRoundsData = JSON.parse(localStorage.getItem('allRoundsData'))
        allRoundsData.push(roundData);
        localStorage.setItem('allRoundsData', JSON.stringify(allRoundsData));
        */

        // Saves the value of total, actual, and delta
        localStorage.setItem('total', total);
        localStorage.setItem('actual', actual);
        localStorage.setItem('delta', delta);

        window.location.href = 'metric.html';                   // Redirects users to the metric.html page 
    });

});

