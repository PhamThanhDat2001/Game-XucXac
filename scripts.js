const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const video = document.getElementById("myVideo");
let player = 0;
let scores = [0, 0];
let playing = true;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;

const switchPlayer = () => {
  document.getElementById(`current--${player}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
  player = player === 0 ? 1 : 0;
}

const roll = () => {
  if (playing) {
    const random = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${random}.png`;

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}
btnRoll.addEventListener('click', roll);

const holl = () => {
  if (playing) {
    scores[player] += currentScore;
    document.querySelector(`#score--${player}`).textContent = scores[player];

    if (scores[player] >= 10) {
      diceEl.classList.add('hidden');
      playing = false;
      document.querySelector(`.player--${player}`).classList.add('player--winner');
      video.style.display = 'block'; // Show video element
      video.play(); // Play the video
      video.muted = false; // Unmute the video
      video.onended = () => { // Event listener for video end
        video.style.display = 'none'; // Hide video element
        video.currentTime = 0; // Reset video to start
        video.muted = true; // Mute the video
      };
    } else {
      switchPlayer();
    }
  }
}
btnHold.addEventListener('click', holl);

const newg = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  document.querySelector(`.player--${player}`).classList.remove('player--winner');
  playing = true;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player = 0;
  scores = [0, 0];
  currentScore = 0;
  diceEl.classList.add('hidden');
  video.style.display = 'none'; // Hide video element on new game
  video.currentTime = 0; // Reset video to start
  video.muted = true; // Mute the video
}
btnNew.addEventListener('click', newg);
