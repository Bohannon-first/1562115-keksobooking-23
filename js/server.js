import {inputTitleAd, inputPriceAd, descriptionTextarea, inputAddress} from './form.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')

    // .then((response) => {
    //   if (response.ok) {
    //     response.json();
    //     // console.log(response);
    //     onSuccess();
    //   } else {
    //     onFail('Не удалось получить данные с сервера');
    //   }
    // })
    // .catch(() => {
    //   onFail('Не удалось получить данные с сервера');
    // });

    .then((response) => response.json())
    .then((someAds) => {
      onSuccess(someAds);
    });
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
        inputTitleAd.value = '';
        inputPriceAd.value = '';
        descriptionTextarea.value = '';
        inputAddress.value = `${35.68170}, ${139.75389}`;
        // onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз1');
    });
};

export {getData, sendData};
