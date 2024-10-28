// Описаний в документації
import flatpickr from "flatpickr";
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('button[data-start]');
const datePicker = document.getElementById('datetime-picker');
let userSelectedDate = null;
let countdownInterval = null;

// Функція для форматування чисел з додаванням ведучого нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для оновлення значень на екрані
function updateDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Функція перетворення мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Ініціалізація бібліотеки flatpickr
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future" });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  }
});

// Обробник кнопки Start
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datePicker.disabled = false;
      startButton.disabled = true;
      iziToast.success({ title: "Done", message: "Countdown finished!" });
      return;
    }

    const timeComponents = convertMs(timeDifference);
    updateDisplay(timeComponents);
  }, 1000);
});
