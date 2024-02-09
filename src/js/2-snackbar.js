// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const myForm = document.querySelector('.form');
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedOption= document.querySelector('input[name="state"]:checked').value
    const delay = document.querySelector('.indelay').value;


     const inputElement = document.querySelector('input[type="radio"]');
    
    
    // Створюємо проміс
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedOption === "fulfilled") {
                resolve(delay)
            } else if (selectedOption === "rejected") {
                reject(delay)
            }
        }, delay);
        
    });


    // Обробляємо результати промісу
          promise.then((delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topCenter',
            backgroundColor: '#59a10d',
            color: '#fff',
            theme: 'dark',
            maxWidth: '383px',
            
        });
    }).catch((delay) => {
        iziToast.error({
           message: `❌ Rejected promise in ${delay}ms`,
            position: 'topCenter',
            backgroundColor: '#ef4040',
            color: '#fff',
            theme: 'dark',
            maxWidth: '302px',
        
        });
    });
});
