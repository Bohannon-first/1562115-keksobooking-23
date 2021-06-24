const getRandomNumber = function (minNum, maxNum, lengthNum = 0) {
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
    const randomNumber = minNum + Math.random() * (maxNum - minNum);
    return +randomNumber.toFixed(lengthNum);
  }
};
getRandomNumber();

const checkTextContent = (element) => {
  if (element.textContent === '') {
    element.remove();
  }
  return element;
};

const checkChild = (element) => {
  if (element.children.length === 0) {
    element.remove();
  }
  return element;
};

export {getRandomNumber};
export {checkTextContent};
export {checkChild};
