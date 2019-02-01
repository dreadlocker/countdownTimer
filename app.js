window.onload = function () {
  const min5Btn = document.getElementById('min5');
  const min15Btn = document.getElementById('min15');
  const min60Btn = document.getElementById('min60');
  const minsChoiceInput = document.getElementById('minsChoice');
  const timerContainer = document.getElementById('timerContainer');
  const timeToBeBack = document.getElementById('backAt');
  let interval = null;

  function setTimer(minutes) {
    event.stopPropagation();
    event.preventDefault();

    minsChoiceInput.value = ''; // Clear user input field
    clearInterval(interval); // Invoke here to fix bug for clicking all buttons
    backAt(minutes);

    let seconds = minutes * 60;
    displayTimer(seconds); // Invoke here to fix interval's 1 second delay
    interval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(interval);
        timeToBeBack.innerHTML = '';
        return;
      }

      seconds--;
      displayTimer(seconds);
    }, 1000);
  }

  function backAt(minutes) {
    const then = Date.now() + minutes * 60 * 1000; // Add chosen time in milliseconds to current time in milliseconds
    const hoursToDisplay = new Date(then).getHours();
    const minutesToDisplay = new Date(then).getMinutes() < 10 ? `0${new Date(then).getMinutes()}` : new Date(then).getMinutes(); // Add 0 in front, if minutes are 1 digit number
    timeToBeBack.innerHTML = `Be back at: ${hoursToDisplay}:${minutesToDisplay}`;
  }

  function displayTimer(seconds) {
    const secs = (seconds % 60 < 10) ? `0${seconds % 60}` : seconds % 60; // Add 0 in front, if seconds are 1 digit number
    const minutes = Math.floor(seconds / 60);
    timerContainer.innerText = `${minutes}:${secs}`;
  }

  function handleUserInput() {
    if (minsChoiceInput.value !== '') {
      const minutes = parseInt(minsChoiceInput.value);
      (isNaN(minutes)) ? alert('Wrong input') : setTimer(minutes);
    }
  }

  min5Btn.addEventListener('click', () => setTimer(5));
  min15Btn.addEventListener('click', () => setTimer(15));
  min60Btn.addEventListener('click', () => setTimer(60));
  minsChoiceInput.addEventListener("focusout", handleUserInput);
}