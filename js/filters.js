import {mapFilters} from './form.js';
import {QUANTITY_ADS} from './data.js';
import {myAds, markerGroup} from './map.js';
import {data} from './main.js';
import {debounce} from './util.js';

// Фильтры формы
const listTypeHousing = mapFilters.querySelector('#housing-type');
const listHousingPrice = mapFilters.querySelector('#housing-price');
const listHousingRooms = mapFilters.querySelector('#housing-rooms');
const listHousingGuests = mapFilters.querySelector('#housing-guests');

// филдсет с инпутами и лейблами
const fieldsetForFeature = mapFilters.querySelector('.map__features');

// инпуты с фичами
const featureInputs = fieldsetForFeature.querySelectorAll('.map__checkbox');

const featureWifi = fieldsetForFeature.querySelector('#filter-wifi');
const featureDishwasher = fieldsetForFeature.querySelector('#filter-dishwasher');
const featureParking = fieldsetForFeature.querySelector('#filter-parking');
const featureWasher = fieldsetForFeature.querySelector('#filter-washer');
const featureElevator = fieldsetForFeature.querySelector('#filter-elevator');
const featureConditioner = fieldsetForFeature.querySelector('#filter-conditioner');

// Массив с выбранными фичами
// const selectedFeatures = [];

const createAds = [];

// Проверка типа жилья
const checkTypeHousing = (ad) => listTypeHousing.value === ad.offer.type || listTypeHousing.value === 'any';

// Проверка стоимости жилья
const checkPrice = (ad) => {
  const price = ad.offer.price;
  return (
    listHousingPrice.value === 'middle' && price >= 10000 && price <= 50000) ||
    (listHousingPrice.value === 'low' && price < 10000) ||
    (listHousingPrice.value === 'high' && price > 50000) ||
    (listHousingPrice.value === 'any');
};

// Проверка количества комнат
const checkQuantityRooms = (ad) => +listHousingRooms.value === ad.offer.rooms || listHousingRooms.value === 'any';


// Проверка количества гостей
const checkQuantityGuests = (ad) => +listHousingGuests.value === ad.offer.guests || listHousingGuests.value === 'any';

// Фильтр фичеей
const checkFeatures = (ad) => Array.from(featureInputs).every((input) => {
  if (!input.checked) {
    return true;
  }
  else if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(input.value);
});

mapFilters.addEventListener('change', () => {
  markerGroup.clearLayers();
  const newData = [...data];
  // console.log(newData);
  const filteredData = newData.filter((ad) =>
    // console.log(checkPrice(ad), checkTypeHousing(ad));
    checkTypeHousing(ad) && checkPrice(ad) && checkQuantityRooms(ad) && checkQuantityGuests(ad) && checkFeatures(ad));
  // console.log(filteredData);
  myAds(filteredData.slice(0, QUANTITY_ADS));
});
