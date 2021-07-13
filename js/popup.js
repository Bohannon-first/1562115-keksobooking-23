// import {listAds} from './data.js';
import {checkTextContent} from './util.js';
import {checkChild} from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const templatePopup = document.querySelector('#card').content;
const similarPopup = templatePopup.querySelector('.popup');

const TYPE_HOUSES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// const similarAds = listAds;

// similarAds.forEach((ad) => {
//   const adElement = similarPopup.cloneNode(true);

//   const adAvatar = adElement.querySelector('.popup__avatar');
//   const adTitle = adElement.querySelector('.popup__title');
//   const adTextAddress = adElement.querySelector('.popup__text--address');
//   const adTextPrice = adElement.querySelector('.popup__text--price');
//   const adType = adElement.querySelector('.popup__type');
//   const adTextCapacity = adElement.querySelector('.popup__text--capacity');
//   const adTextTime = adElement.querySelector('.popup__text--time');
//   const adDescription = adElement.querySelector('.popup__description');
//   const adPhotos = adElement.querySelector('.popup__photos');
//   const adFeatures = adElement.querySelector('.popup__features');

//   adAvatar.src = ad.author.avatar;
//   adTitle.textContent = ad.offer.title;
//   adTextAddress.textContent = ad.offer.address;
//   adTextPrice.textContent = `${ad.offer.price} ₽/ночь`;
//   adType.textContent = TYPE_HOUSES_DICTIONARY[ad.offer.type];
//   adTextCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
//   adTextTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
//   adDescription.textContent = ad.offer.description;

//   ad.offer.photos.forEach((photo) => {
//     const photoElement = document.createElement('img');
//     photoElement.src = photo;
//     photoElement.classList.add('popup__photo');
//     photoElement.width = 45;
//     photoElement.height = 40;
//     photoElement.alt = 'Фотография жилья';
//     adPhotos.appendChild(photoElement);
//   });

//   ad.offer.features.forEach((feature) => {
//     const featureElement = document.createElement('li');
//     featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
//     adFeatures.appendChild(featureElement);
//   });

//   checkTextContent(adTitle);
//   checkTextContent(adTextAddress);
//   checkTextContent(adTextPrice);
//   checkTextContent(adType);
//   checkTextContent(adTextCapacity);
//   checkTextContent(adTextTime);
//   checkTextContent(adDescription);

//   checkChild(adFeatures);
//   checkChild(adPhotos);

//   mapCanvas.appendChild(adElement);
// });

const createCustomPopup = (author, offer) => {
  const popupElement = similarPopup.cloneNode(true);

  const avatar = popupElement.querySelector('.popup__avatar');
  const title = popupElement.querySelector('.popup__title');
  const address = popupElement.querySelector('.popup__text--address');
  const price = popupElement.querySelector('.popup__text--price');
  const typeOfHousing = popupElement.querySelector('.popup__type');
  const capacity = popupElement.querySelector('.popup__text--capacity');
  const time = popupElement.querySelector('.popup__text--time');
  const features = popupElement.querySelector('.popup__features');
  const description = popupElement.querySelector('.popup__description');
  const photos = popupElement.querySelector('.popup__photos');

  avatar.src = author.avatar;
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  if (!offer.price) {price.remove();}
  typeOfHousing.textContent = TYPE_HOUSES_DICTIONARY[offer.type];
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (!offer.rooms || !offer.guests) {capacity.remove();}
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (!offer.checkin || !offer.checkout) {time.remove();}
  description.textContent = offer.description;

  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.classList.add('popup__photo');
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      photos.appendChild(photoElement);
    });
  }

  if (offer.features) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      features.appendChild(featureElement);
    });
  }

  checkTextContent(title);
  checkTextContent(address);
  checkTextContent(typeOfHousing);
  checkTextContent(description);

  checkChild(features);
  checkChild(photos);

  return popupElement;
};

export {mapCanvas, similarPopup, TYPE_HOUSES_DICTIONARY, createCustomPopup};
