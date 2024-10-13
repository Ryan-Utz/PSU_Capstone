document.addEventListener('DOMContentLoaded', () => {
    let stratButton = document.getElementById('strategize-button');

    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;                   // Set currentRound to the value of current round, if uninitialized, default to round 1
    document.querySelector('.round-number h1').textContent = `Round ${currentRound}`;

    const plan = localStorage.getItem('plan');
    const total = localStorage.getItem('total');
    const defects = localStorage.getItem('defects');
    const actual = localStorage.getItem('actual');
    const delta = localStorage.getItem('delta');

    document.getElementById('plan-metric').textContent = `Plan: ${plan}`;
    document.getElementById('total-metric').textContent = `Total: ${total}`;
    document.getElementById('defects-metric').textContent = `Defects: ${defects}`;
    document.getElementById('actual-metric').textContent = `Actual: ${actual}`;
    document.getElementById('delta-metric').textContent = `Delta: ${delta}`;

    stratButton.addEventListener('click', () => {
        window.location.href = 'strategize.html';
    })
});


