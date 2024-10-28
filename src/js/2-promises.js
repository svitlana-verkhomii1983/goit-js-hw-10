// Імпортуємо бібліотеку iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Знаходимо форму та добавляємо обробник події 'submit'
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Попереджуємо перезавантаження сторінки

  // Отримуємо значення з форми
  const delay = parseInt(form.delay.value);
  const state = form.state.value;

  // Створюємо проміс із заданою затримкою та станом
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка успішного та неуспішного виконання промісу
  promise
    .then((delay) => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight'
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight'
      });
    });
});