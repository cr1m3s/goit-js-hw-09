import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const start_button = document.querySelector("[data-start='']");
start_button.disabled = true;

let timerId = null;
let countdown;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  FormDate: 'U',
  onClose: function (selectedDates) {
    if (selectedDates[0] < options.defaultDate) window.alert('Please choose a date in the future');
    else start_button.disabled = false;
  },
};

let fp = flatpickr('input#datetime-picker', options);

start_button.addEventListener('click', countdown_func);

function countdown_func() {
  countdown = fp.selectedDates[0].getTime() - Date.now();
  start_button.disabled == true;

  setTimeout(() => {
    if (countdown > 0) {
      update_info();
      countdown--;
    } else {
      start_button.disabled = false;
    }
  }, 1000);
}

function update_info() {
  {
    document.querySelector("[data-days='']").textContent,
      document.querySelector("[data-hours='']").textContent,
      document.querySelector("[data-minutes='']").textContent,
      document.querySelector("[data-seconds='']").textContent,
} = convertMs(countdown);
}

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
