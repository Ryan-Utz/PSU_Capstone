document.addEventListener("DOMContentLoaded", () => {
    let nextRoundButton = document.getElementById('next-round-button');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;

    function countDown(duration){
        let time = duration

        // Countdown timer, runs code every 1000 milliseconds / 1 second.
        let timer = setInterval(() => {
            let minutes = parseInt((time / 60), 10);                                            // parseInt to get the first int value
            let seconds = parseInt((time % 60), 10).toString().padStart(2, "0");                // Will display the seconds as 09 instead of 9, if second is 10, will remain 10 as an example
            document.getElementById("timer-display").textContent = `${minutes}:${seconds}`;

            // Decrement timer
            time--; 

            // If time is less than 0, stop the timer and alert user.
            if(time < 0){
                clearInterval(timer);
                alert("Time is up!")

                // Display the next rount button once the timer is up
                document.getElementById('next-round-button-container').style.display = 'block';
            }
        }, 1000);
    }

    countDown(5);

    nextRoundButton.addEventListener('click', () => {
        let currentRound = parseInt(localStorage.getItem('currentRound')) || 1;
        currentRound++;
        localStorage.setItem('currentRound', currentRound);                                     // Save the updated current round value to local storage
        window.location.href = 'plan.html'
    });

});

