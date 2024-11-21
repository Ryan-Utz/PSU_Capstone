document.addEventListener("DOMContentLoaded", () => {
    const nextRoundButton = document.getElementById('next-round-button');
    const clearDataButton = document.getElementById('clear-data-button');
    let audio = new Audio("alarm.mp3");



    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;


    let allRoundsData = JSON.parse(localStorage.getItem('allRoundsData')) || [];                // Load all the existing round data


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
                audio.play();
                alert("Time is up!");

                if(alert){
                    audio.pause();
                }


                // Display the next rount button once the timer is up
                document.getElementById('next-round-button-container').style.display = 'block';
            }
        }, 1000);
    }


    countDown(60);


    nextRoundButton.addEventListener('click', () => {
        let currentRound = parseInt(localStorage.getItem('currentRound')) || 1;
        currentRound++;
        localStorage.setItem('currentRound', currentRound);                                     // Save the updated current round value to local storage
        window.location.href = 'plan.html'
    });


    clearDataButton.addEventListener('click', () => {
        let confirmClear = confirm("Are you sure you want to reset all round data and restart from Round 1?");
        if(confirmClear){
            localStorage.clear();
            localStorage.setItem('currentRound', 1);
            window.location.href = 'plan.html'


        }
    });


    // Dynamically display each rounds data metric during the strategize phase
    function displayRoundData(){
        allRoundsData.forEach((roundData, index) => {
            const roundNumber = index + 1;


            const roundElement = document.getElementById(`round-${roundNumber}`);
            if(roundElement && roundNumber <= currentRound){
                roundElement.classList.remove('hidden');
                document.getElementById(`round-${roundNumber}-plan`).textContent = roundData.plan;
                document.getElementById(`round-${roundNumber}-total`).textContent = roundData.total;
                document.getElementById(`round-${roundNumber}-defects`).textContent = roundData.defects;
                document.getElementById(`round-${roundNumber}-actual`).textContent = roundData.actual;
                document.getElementById(`round-${roundNumber}-delta`).textContent = roundData.delta;
            }
        });
    }


    displayRoundData();


});

