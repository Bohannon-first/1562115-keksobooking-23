import {mapFilters} from './form.js';
import {myAds, markerGroup} from './map.js';
import {data} from './main.js';
import {debounce} from './util.js';

const QUANTITY_ADS = 10;
const listTypeHousing = mapFilters.querySelector('#housing-type');
const listHousingPrice = mapFilters.querySelector('#housing-price');
const listHousingRooms = mapFilters.querySelector('#housing-rooms');
const listHousingGuests = mapFilters.querySelector('#housing-guests');

const fieldsetForFeature = mapFilters.querySelector('.map__features');
const featureInputs = fieldsetForFeature.querySelectorAll('.map__checkbox');

const checkTypeHousing = (ad) => listTypeHousing.value === ad.offer.type || listTypeHousing.value === 'any';

const checkPrice = (ad) => {
  const price = ad.offer.price;
  return (
    listHousingPrice.value === 'middle' && price >= 10000 && price <= 50000) ||
    (listHousingPrice.value === 'low' && price < 10000) ||
    (listHousingPrice.value === 'high' && price > 50000) ||
    (listHousingPrice.value === 'any');
};

const checkQuantityRooms = (ad) => +listHousingRooms.value === ad.offer.rooms || listHousingRooms.value === 'any';

const checkQuantityGuests = (ad) => +listHousingGuests.value === ad.offer.guests || listHousingGuests.value === 'any';

const checkFeatures = (ad) => Array.from(featureInputs).every((input) => {
  if (!input.checked) {
    return true;
  }
  else if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(input.value);
});

mapFilters.addEventListener('change', debounce(() => {
  markerGroup.clearLayers();
  const newData = [...data];
  const filteredData = newData.filter((ad) =>
    checkTypeHousing(ad) && checkPrice(ad) && checkQuantityRooms(ad) && checkQuantityGuests(ad) && checkFeatures(ad));
  myAds(filteredData.slice(0, QUANTITY_ADS));
}));

export {QUANTITY_ADS};
