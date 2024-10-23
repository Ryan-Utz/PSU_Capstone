document.addEventListener('DOMContentLoaded', () => {
    let stratButton = document.getElementById('strategize-button');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;


    const allRoundsData = JSON.parse(localStorage.getItem('allRoundsData')) || [];

    //Get the data for the current round
    const roundData = allRoundsData.find((data) => {
        return data.round === currentRound;
    });

    // If roundData exists, display it
    if(roundData){
        // const { plan, total, defects, actual, delta } = roundData;

        const plan = roundData.plan;
        const total = roundData.total;
        const defects = roundData.defects;
        const actual = total - defects;
        const delta = actual - plan;

        document.getElementById('plan-metric').textContent = `Plan: ${plan}`;
        document.getElementById('total-metric').textContent = `Total: ${total}`;
        document.getElementById('defects-metric').textContent = `Defects: ${defects}`;
        document.getElementById('actual-metric').textContent = `Actual: ${actual}`;
        document.getElementById('delta-metric').textContent = `Delta: ${delta}`;
    }
    else{
        console.error("No round data found for the current round.")
    }

    // const plan = localStorage.getItem('plan');
    // const total = localStorage.getItem('total');
    // const defects = localStorage.getItem('defects');
    // const actual = localStorage.getItem('actual');
    // const delta = localStorage.getItem('delta');

    // document.getElementById('plan-metric').textContent = `Plan: ${plan}`;
    // document.getElementById('total-metric').textContent = `Total: ${total}`;
    // document.getElementById('defects-metric').textContent = `Defects: ${defects}`;
    // document.getElementById('actual-metric').textContent = `Actual: ${actual}`;
    // document.getElementById('delta-metric').textContent = `Delta: ${delta}`;

    stratButton.addEventListener('click', () => {
        window.location.href = 'strategize.html';
    })
});


