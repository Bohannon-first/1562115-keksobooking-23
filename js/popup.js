import {listAds} from './data.js';

// Карта
const mapCanvas = document.querySelector('#map-canvas');

// Шаблон карточки объявления
const templatePopup = document.querySelector('#card').content;

// Наполняемый блок шаблона
const similarPopup = templatePopup.querySelector('.popup');

// Объект-словарь
const TYPE_HOUSES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец Путинa',
  hotel: 'Отель',
};

// Массив с объектами-объявлениями
const similarAds = listAds;
// console.log(similarAds);

// Проверка на отсутствие текста внутри элемента. Если текста нет - удалить элемент
const checkTextContent = (element) => {
  if (element.textContent === '') {
    element.remove();
  }
  return element;
};

// Проверка на отсутствие детей в родителе. Если детей нет, то - удалить родителя
const checkChild = (element) => {
  if (element.children.length === 0) {
    element.remove();
  }
  return element;
};

// Наполнение карточек-объявлений данными из массива с объектами-объявлениями
similarAds.forEach((ad) => {

  // Клонирование шаблона карточки в отдельную переменную
  const adElement = similarPopup.cloneNode(true);

  // Переменные-элементы в карточке объявления
  const adAvatar = adElement.querySelector('.popup__avatar');
  const adTitle = adElement.querySelector('.popup__title');
  const adTextAddress = adElement.querySelector('.popup__text--address');
  const adTextPrice = adElement.querySelector('.popup__text--price');
  const adType = adElement.querySelector('.popup__type');
  const adTextCapacity = adElement.querySelector('.popup__text--capacity');
  const adTextTime = adElement.querySelector('.popup__text--time');
  const adDescription = adElement.querySelector('.popup__description');
  const adPhotos = adElement.querySelector('.popup__photos');
  const adFeatures = adElement.querySelector('.popup__features');

  // Запись в переменные-элементы данных из массива с объектами-объявлениями
  adAvatar.src = ad.author.avatar;
  adTitle.textContent = ad.offer.title;
  adTextAddress.textContent = ad.offer.address;
  adTextPrice.textContent = `${ad.offer.price} ₽/ночь`;
  adType.textContent = TYPE_HOUSES_DICTIONARY[ad.offer.type];
  adTextCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adTextTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  adDescription.textContent = ad.offer.description;

  // Создание тегов img с фотографиями жилья
  ad.offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    adPhotos.appendChild(photoElement);
  });

  // Создание тегов li с фичами
  ad.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    adFeatures.appendChild(featureElement);
  });

  // Вызовы функции с проверкой элементов карточки(переменных) на отсутствие текста
  checkTextContent(adTitle);
  checkTextContent(adTextAddress);
  checkTextContent(adTextPrice);
  checkTextContent(adType);
  checkTextContent(adTextCapacity);
  checkTextContent(adTextTime);
  checkTextContent(adDescription);

  // Вызовы функции с проверкой на наличие детей в родителе
  checkChild(adFeatures);
  checkChild(adPhotos);

  // Добавление наполненной карточки в блок с картой
  mapCanvas.appendChild(adElement);
});
