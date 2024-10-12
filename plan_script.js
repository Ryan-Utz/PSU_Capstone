document.addEventListener('DOMContentLoaded', () => {
    const planInput = document.getElementById('plan');
    const startRoundButton = document.getElementById('start-round');

    startRoundButton.addEventListener("click", () => {
        let planValue = planInput.value;
        localStorage.setItem('plan', planValue);
        window.location.href = 'timer.html'
    });

});