
// fetch('https://23.javascript.pages.academy/keksobooking/data')
//   .then((response) => response.json())
//   .then((ads) => {
//   console.log(ads);
//   });

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((someAds) => {
      // console.log(someAds);
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
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
