const form = document.querySelector('.form');
const form_delay = document.querySelector('[name = delay]');
const form_step = document.querySelector('[name = step]');
const form_amount = document.querySelector('[name = amount]');

form.addEventListener('submit', Submit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function Submit(event) {
  event.preventDefault();

  let delay = Number(form_delay.value);
  let amount = Number(form_amount.value);
  let step = Number(form_step.value);
  let counter = 0;

  while (++counter <= amount) {
    createPromise(counter, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
