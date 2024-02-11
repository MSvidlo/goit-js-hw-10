// commonjs


// es modules are recommended, if available, especially for typescript
import flatpickr from "flatpickr";

// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
    
// Описаний у документації
import iziToast from "izitoast";     
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
let countdownInterval;
let isTimerStarted = false;
const input = document.querySelector("input#datetime-picker")
// використання бібліотеки flatpicker
const options = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    onClose: function (selectedDates) {
        const selectedDate = selectedDates[0];
        const today = new Date();
// перевірка валдності дати  
        if (selectedDate <= today) {
            document.querySelector('button[data-start]').disabled = true;
// бібліотека iziToast для відображення повідомлення 
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topCenter'
            });
        } else {
            document.querySelector('button[data-start]').disabled = false;
        }
    },
   
});


const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

startBtn.addEventListener('click', function () {
// валідація щоб запобігти користувачу від вибору нової дати після старту зворотного відліку
    if (isTimerStarted) {
       return;
    }

isTimerStarted = true;

    const selectedDate = new Date(options.selectedDates[0]);
    const countdownElement = document.querySelector('.timer');

    countdownInterval = setInterval(function () {
            const now = new Date();
            const timeDiff = selectedDate - now;

            if (timeDiff <= 0) {
                clearInterval(countdownInterval);
                document.querySelector('[data-days]').textContent = "00";
                document.querySelector('[data-hours]').textContent = "00";
                document.querySelector('[data-minutes]').textContent = "00";
                document.querySelector('[data-seconds]').textContent = "00";
                return;
            }
 const timeRemaining = convertMs(timeDiff);
            document.querySelector('[data-days]').textContent = addLeadingZero(timeRemaining.days);
            document.querySelector('[data-hours]').textContent = addLeadingZero(timeRemaining.hours);
            document.querySelector('[data-minutes]').textContent = addLeadingZero(timeRemaining.minutes);
            document.querySelector('[data-seconds]').textContent = addLeadingZero(timeRemaining.seconds);
        }, 1000);

        this.disabled = true;
})

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
};

function addLeadingZero(value) {
        return value < 10 ? "0" + value : value.toString();
};


