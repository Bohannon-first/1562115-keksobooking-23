// eslint-disable-next-line
'use strict';

const getSomeNumber = function (minNum, maxNum, lengthNum = 0) {
  if (minNum < 0) {
    return 'Ошибка. Вы ввели отрицательное число. Число должно быть положительное.';
  }
  else if (maxNum <= minNum) {
    return 'Ошибка. Конечное число меньше или равно начальному.';
  }
  else if (minNum >= maxNum) {
    return 'Ошибка. Начальное число не должно быть больше или равно конечному.';
  }
  else {
    const randomNumber = Math.floor(minNum + Math.random() * (maxNum + 1 - minNum));
    return randomNumber.toFixed(lengthNum);
  }
};
getSomeNumber(0, 100, 1);
