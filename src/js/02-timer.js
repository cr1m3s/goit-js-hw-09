import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const start_button = document.querySelector("[data-start='']");
start_button.disabled = true;

let timerId = null;
let countdown = 0;

const form_days = document.querySelector("[data-days='']");
const form_hours = document.querySelector("[data-hours='']");
const form_minutes = document.querySelector("[data-minutes='']");
const form_seconds = document.querySelector("[data-seconds='']");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  FormDate: 'U',
  onClose: function (selectedDates) {
    if (selectedDates[0] <= options.defaultDate) window.alert('Please choose a date in the future');
    else {
      start_button.disabled = false;
      countdown = selectedDates[0].getTime();
      function countdown_func() {
        timerId = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(countdown - Date.now());
          form_days.textContent = days;
          form_hours.textContent = hours;
          form_minutes.textContent = minutes;
          form_seconds.textContent = seconds;
          if (
            Number(form_days.textContent) === 0 &&
            Number(form_hours.textContent) === 0 &&
            Number(form_minutes.textContent) === 0 &&
            Number(form_seconds.textContent) === 0
          )
            clearInterval(timerId);
        }, 1000);
      }
      start_button.addEventListener('click', countdown_func);
    }
  },
};

let fp = flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
