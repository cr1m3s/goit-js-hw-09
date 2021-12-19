function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

button_start = document.querySelector("[data-start='']");
button_start.addEventListener('click', body_color);
let timerId = null;

function body_color() {
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  button_start.disabled = true;
}

button_stop = document.querySelector("[data-stop='']");
button_stop.addEventListener('click', reset_button);

function reset_button() {
  clearInterval(timerId);
  button_start.disabled = false;
}
