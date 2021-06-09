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
    const randomNumber = Math.floor(minNum + Math.random() * (maxNum + 1 - minNum));
    return +randomNumber.toFixed(lengthNum);
  }
};
getRandomNumber(0, 100, 1);
// console.log(getRandomNumber(0, 100));


// ПОЛУЧЕНИЕ МАССИВА ИЗ ДЕСЯТИ СГЕНЕРИРОВАННЫХ ОБЪЕКТОВ
// Количество объектов(объявлений)
const QUANTITY_OBJECTS = 10;

// Массив с описанием авторов предложений
const AUTHORS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

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
const PRICE = {
  MIN: 1000,
  MAX: 100000,
};

// Типы жилья
const TYPE_HOUSE = [
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

// Время начала регистрации в отеле
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

// Время окончания суток и выезда из отеля
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
const DESCRIPTION = [
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
