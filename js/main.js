// Количество необходимых объектов для генерации
const QUANTITY_ADS = 10;

// Массив с заголовками предложений
const TITLES = [
  'Тишина и покой загородной жизни',
  'С видом на сад',
  'С королевским размахом',
  'Для большой семьи',
  'Экологически благополучная обстановка',
  'Рядом с домом парк отличное место для отдыха и пеших прогулок',
  'Подчеркните свой статус',
  'Островок рая для свободного художника',
  'Легендарные стиль и качество',
  'Замечательное место для приема гостей и релакса',
];

// Диапазон цен
const PRICES = {
  MIN: 1000,
  MAX: 100000,
};

// Типы жилья
const TYPE_HOUSES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

// Количество комнат
const ROOMS = {
  MIN: 1,
  MAX: 5,
};
const GUESTS = {
  MIN: 5,
  MAX: 25,
};

// Время начала регистрации
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

// Время окончания суток и выезда
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

// Список преимуществ
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

// Список описаний помещений
const DESCRIPTIONS = [
  'Можно дышать свежим воздухом не вдыхая смог проезжающего автотранспорта благодаря тому, что окна квартиры выходят на парк.',
  'Отсутствует проблема с парковкой. Всегда свободные парковочные места, можно удобно припарковаться рядом с домом.',
  'Улучшенная планировка и большая площадь. 44 кв.м. общей площади и 9 метровая кухня это гораздо больше, чем в стандартной 1-комнатной квартире.',
  'Мечтаете жить во дворце? Разрешите предложить Вам варианты лучше',
  'Генеральские дачи. Открывайте новый формат коллекционной недвижимости',
  'Квартира в 2-х уровнях, практически свой дом. 100 квадратных метров света и уюта. Живите и радуйтесь жизни в лучах солнца.',
  '2 ванны — это так удобно',
  'Квартира в 2-х уровнях, практически свой дом. Хотите что бы Вам завидовали?!',
  'Захватывающее ощущение раскрепощенности и легкости',
  'Каждый уголок квартиры освещен светом добра и любви',
];

// Список фотографий
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Координаты местонахождения на карте
const LOCATION = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};

// Массив аватаров
const arrayAvatars = [];

// Функция получения рандомного числа
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

// Счётчик заполнения массива аватаров URL-ссылками
for (let imageCounter = 1; imageCounter <= QUANTITY_ADS; imageCounter++) {
  if (imageCounter < 10) {
    arrayAvatars.push(`img/avatars/user0${imageCounter}.png`);
  } else {
    arrayAvatars.push(`img/avatars/user${imageCounter}.png`);
  }
}

// Вырезание/удаление случайного элемента из массива аватаров
const cutRandomElementArray = function (someArray) {
  return someArray.splice(getRandomNumber(0, someArray.length - 1), 1);
};

// Получение рандомного элемента из массива
const getRandomElementArray = function (someArray) {
  return someArray[getRandomNumber(0, someArray.length -1)];
};

// Получение массива случайной длины из другого массива
const getArrayRandomLength = function (someArray) {
  const someIndexArray = getRandomNumber(1, someArray.length); // Получение рандомного индекса элемента массива
  const newRandomArray = [];
  for (let i = 0; i < someIndexArray; i++) {
    newRandomArray.push(someArray[i]);
  }
  return newRandomArray;
};

// Функция генерации объектов
const createAds = function () {
  const locationX = getRandomNumber(LOCATION.LAT.MIN, LOCATION.LAT.MAX, 5);
  const locationY = getRandomNumber(LOCATION.LNG.MIN, LOCATION.LNG.MAX, 5);
  return {
    author: {
      avatar: `${cutRandomElementArray(arrayAvatars).join()}`,
    },
    offer: {
      title: `${cutRandomElementArray(TITLES)}`,
      address: `${locationX}, ${locationY}`,
      price: `${getRandomNumber(PRICES.MIN, PRICES.MAX)} рублей`,
      type: `${getRandomElementArray(TYPE_HOUSES)}`,
      rooms: `${getRandomNumber(ROOMS.MIN, ROOMS.MAX)} комнат(ы)`,
      guests: `${getRandomNumber(GUESTS.MIN, GUESTS.MAX)} человек(а)`,
      checkin: `Время заселения ${getRandomElementArray(CHECKIN)}`,
      checkout: `Время выезда ${getRandomElementArray(CHECKOUT)}`,
      features: `${getArrayRandomLength(FEATURES).join(', ')}`,
      description: `${cutRandomElementArray(DESCRIPTIONS)}`,
      photos: `${getArrayRandomLength(PHOTOS).join(', ')}`,
    },
    location: {
      lat: `${locationX}`,
      lng: `${locationY}`,
    },
  };
};

const listAds = new Array(QUANTITY_ADS).fill(null).map(() => createAds());
listAds; // Чтобы eslint не ругался, что listAds не используется
// console.log(listAds);
