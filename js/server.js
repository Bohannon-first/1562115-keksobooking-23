import {inputAddress, adForm} from './form.js';
import {showAlert} from './util.js';

const templateSuccess = document.querySelector('#success').content;
const popupSuccess = templateSuccess.querySelector('.success');

const templateError = document.querySelector('#error').content;
const popupError = templateError.querySelector('.error');

const showSuccessPopup = () => {
  const success = popupSuccess.cloneNode(true);
  document.body.appendChild(success);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'|| evt.key === 'Esc') {
      success.remove();
    }
  });
};

const showErrorPopup = () => {
  const error = popupError.cloneNode(true);
  const errorButton = error.querySelector('.error__button');
  document.body.appendChild(error);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'|| evt.key === 'Esc') {
      error.remove();
    }
  });

  errorButton.addEventListener('click', () => {
    error.remove();
  });
};

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((someAds) => {
      onSuccess(someAds);
    })
    .catch((err) => showAlert(err));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        adForm.reset();
        inputAddress.value = `${35.68170}, ${139.75389}`;
        showSuccessPopup();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз1');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз2');
    });
};

export {getData, sendData, showErrorPopup};
