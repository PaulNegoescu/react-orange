'use strict';

const initialCount = 0;
let count = initialCount;

const output = document.querySelector('[data-counter-output]');
const buttons = document.querySelectorAll('[data-counter-button]');
const actions = document.querySelector('[data-counter-actions]');

// for (const button of buttons) {
//   button.addEventListener('click', handleClick);
// }

// event delegation
actions.addEventListener('click', handleClick);

output.textContent = count;

function handleClick(e) {
  const action = e.target.dataset.counterButton;
  if (!action) {
    return;
  }

  switch (action) {
    case 'increment':
      count++;
      break;
    case 'decrement':
      count--;
      break;
    case 'reset':
      count = initialCount;
      break;
    default:
      throw new Error(`The action "${action}" is not implemented in code!`);
  }

  output.classList.remove('positive', 'negative');
  if (count > 0) {
    output.classList.add('positive');
  } else if (count < 0) {
    output.classList.add('negative');
  }

  output.textContent = count;
}

async function getWeather() {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Brasov,RO&appid=8feb7eed04a11a56e7ac15279797d21d'
  );
  const data = await res.json();

  console.log(data);
}

getWeather();
