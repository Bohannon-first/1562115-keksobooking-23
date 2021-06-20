import {listAds} from './data.js';
import {FEATURES} from './data.js';

const mapCanvas = document.querySelector('#map-canvas'); // Карта
const templatePopup = document.querySelector('#card').content; // Шаблон карточки
const similarPopup = templatePopup.querySelector('.popup'); // Наполняемый блок шаблона


const TYPE_HOUSES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец Путинa',
  hotel: 'Отель',
};

const similarAds = listAds;
console.log(similarAds);

similarAds.forEach((ad) => {
  const adElement = similarPopup.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = ad.offer.type;
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  // adElement.querySelector('.popup__features');
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__photos').children.src = ad.offer.photos;

  mapCanvas.appendChild(adElement);
});

const featuresList = similarPopup.querySelector('.popup__features'); // Список с элементами
const featuresElements = featuresList.querySelectorAll('.popup__feature'); // Коллекция элементов
const modifiers = FEATURES.map((feature) => `popup__feature--${feature}`); // Массив с модификаторами

featuresElements.forEach((item) => {
  const modifier = item.classList[1];

  if (!modifiers.includes(modifier)) {
    item.remove();
  }
});
