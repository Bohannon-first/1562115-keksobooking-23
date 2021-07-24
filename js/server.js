import {showAlert} from './util.js';

const urlGetData = 'https://23.javascript.pages.academy/keksobooking/data';
const urlSendData = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(urlGetData)

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
    urlSendData,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз1');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз2');
    });
};

export {getData, sendData};
