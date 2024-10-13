document.addEventListener('DOMContentLoaded', () => {
    const planInput = document.getElementById('plan');
    const startRoundButton = document.getElementById('start-round');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;


    // Clicking the start round button will take users to a new page that will automatically start countdown timer
    startRoundButton.addEventListener("click", () => {
        let planValue = planInput.value;
        localStorage.setItem('plan', planValue);                                                // Store the plan value in the plan input field onto the local web browser storage
        
        const allRoundsData = JSON.parse(localStorage.getItem('allRoundsData')) || [];          // Sets allRoundData as an array or object, if empty, initialize to empty array
        allRoundsData.push({
            round: currentRound,
            plan: planValue
        });

        localStorage.setItem('allRoundsData', JSON.stringify(allRoundsData));                   // Converts the array allRoundsData into a string and save it onto the local storage


        window.location.href = 'timer.html'                                                     // Redirects users to the timer.html page
    });

});