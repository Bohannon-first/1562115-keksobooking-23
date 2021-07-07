import {mapCanvas, similarAds, similarPopup, TYPE_HOUSES_DICTIONARY} from './popup.js';
import {enableAdForm, enableMapFilters, inputAddress} from './form.js';
import {checkTextContent, checkChild} from './util.js';

const map = L.map(mapCanvas);
map.on('load', () => {
  enableAdForm();
  enableMapFilters();

  inputAddress.value = `${35.68170}, ${139.75389}`;
  inputAddress.setAttribute('readonly', 'readonly');
});
map.setView({
  lat: 35.68170,
  lng: 139.75389,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIconMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68170,
    lng: 139.75389,
  },
  { draggable: true,
    icon: mainIconMarker,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const latitude = evt.target.getLatLng().lat.toFixed(5);
  const longitude = evt.target.getLatLng().lng.toFixed(5);
  inputAddress.value = `${latitude}, ${longitude}`;
});

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

  offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photos.appendChild(photoElement);
  });

  offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    features.appendChild(featureElement);
  });

  checkTextContent(title);
  checkTextContent(address);
  checkTextContent(typeOfHousing);
  checkTextContent(description);

  checkChild(features);
  checkChild(photos);

  return popupElement;
};

similarAds.forEach(({author, offer, location}) => {

  const regularIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = location.lat;
  const lng = location.lng;

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: regularIcon,
  },
  );

  marker.addTo(map);
  marker.bindPopup(createCustomPopup(author, offer),
    {
      keepInView: true,
    },
  );
});
