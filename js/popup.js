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
console.log(similarAds);

// Проверка на наличие текста внутри элемента. Если текста нет - удалить элемент
const checkContent = (element) => {
  if (element.textContent === '') {
    element.remove();
  }
  return element;
};

// Наполнение карточек-объявлений данными из массива с объектами-объявлениями
similarAds.forEach((ad) => {
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

  // adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  // adElement.querySelector('.popup__title').textContent = ad.offer.title;
  // adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  // adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  // adElement.querySelector('.popup__type').textContent = TYPE_HOUSES_DICTIONARY[ad.offer.type];
  // adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  // adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  // adElement.querySelector('.popup__description').textContent = ad.offer.description;

  ad.offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    adPhotos.appendChild(photoElement);
  });

  ad.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    adFeatures.appendChild(featureElement);
  });

  checkContent(adTitle);
  checkContent(adDescription);

  mapCanvas.appendChild(adElement);
});
