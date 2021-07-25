import {returnMarker, mainMarker, markerGroup, getMyAds} from './map.js';
import {sendData} from './server.js';
import {data, QUANTITY_ADS} from './main.js';
import {removePhoto} from './photos.js';
import {showPopup} from './popup.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select');

const inputTitleAd = adForm.querySelector('.ad-form__input-title');
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;

const inputPriceAd = adForm.querySelector('.ad-form__input-price');
const MIN_VALUE_PRICE = 0;
const MAX_VALUE_PRICE = 1000000;

const choiceRooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const descriptionTextarea = adForm.querySelector('#description');

const buttonFormReset = adForm.querySelector('.ad-form__reset');

const numberOfRooms = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const typeHousing = adForm.querySelector('#type');
const minPriceHousing = {
  'bungalow': {
    placeholder: 0,
    min: 0,
  },
  'flat': {
    placeholder: 1000,
    min: 1000,
  },
  'hotel': {
    placeholder: 3000,
    min: 3000,
  },
  'house': {
    placeholder: 5000,
    min: 5000,
  },
  'palace': {
    placeholder: 10000,
    min: 10000,
  },
};

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const fieldsetForTime = adForm.querySelector('.ad-form__element--time');
const timeOptions = fieldsetForTime.querySelectorAll('select');
const inputAddress = adForm.querySelector('#address');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};
disableAdForm();

const disableMapFilters = () => {
  mapFilters.classList.add('ad-form--disabled');
  mapFiltersElements.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });
};
disableMapFilters();

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

const enableMapFilters = () => {
  mapFilters.classList.remove('ad-form--disabled');
  mapFiltersElements.forEach((select) => {
    select.removeAttribute('disabled');
  });
};

inputTitleAd.addEventListener('input', () => {
  const lengthValue = inputTitleAd.value.length;

  if (lengthValue < MIN_LENGTH_TITLE) {
    inputTitleAd.setCustomValidity(`Ещё ${MIN_LENGTH_TITLE - lengthValue} символов`);
  } else if (lengthValue > MAX_LENGTH_TITLE) {
    inputTitleAd.setCustomValidity(`Удалите лишние ${lengthValue - MAX_LENGTH_TITLE} символов`);
  } else {
    inputTitleAd.setCustomValidity('');
  }

  inputTitleAd.reportValidity();
});

inputPriceAd.addEventListener('input', () => {
  const valuePrice = inputPriceAd.value;
  const minPrice = minPriceHousing[typeHousing.value];

  if (valuePrice < MIN_VALUE_PRICE) {
    inputPriceAd.setCustomValidity('Минимальная цена не должна быть отрицательной');
  } else if (valuePrice > MAX_VALUE_PRICE) {
    inputPriceAd.setCustomValidity('Максимальная цена не должна превышать 1000000');
  } else if (valuePrice < minPrice.min) {
    inputPriceAd.setCustomValidity('Необходимо ввести минимальную цену');
  } else {
    inputPriceAd.setCustomValidity('');
  }

  inputPriceAd.reportValidity();
});

const validateRooms = (index) => {
  const currentOfRooms = numberOfRooms[index];
  let isSelectedChanged = false;

  Array.from(capacity.options).forEach((option) => {
    option.removeAttribute('selected');
    option.setAttribute('style', 'display:none');

    if (currentOfRooms.includes(option.value)) {
      option.setAttribute('style', 'display:block');
      if (!isSelectedChanged) {
        option.setAttribute('selected', 'selected');
        isSelectedChanged = true;
      }
    }
  });
};

choiceRooms.addEventListener('change', () => {
  const index = choiceRooms.value;
  validateRooms(index);
});

const validateHousing = (type) => {
  const currentTypeHousing = minPriceHousing[type];
  inputPriceAd.placeholder = currentTypeHousing.placeholder;
  inputPriceAd.min = currentTypeHousing.min;
};

typeHousing.addEventListener('change', () => {
  const type = typeHousing.value;
  validateHousing(type);
  inputPriceAd.reportValidity();
});

timeOptions.forEach((select) => {
  select.addEventListener('change', () => {
    const id = select.getAttribute('id');
    let element;

    if (id === 'timein') {
      element = timeOut;
    } else if (id === 'timeout') {
      element = timeIn;
    }

    return element.value = select.value;
  });
});

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        mapFilters.reset();
        adForm.reset();
        markerGroup.clearLayers();
        getMyAds(data.slice(0, QUANTITY_ADS));
        inputAddress.value = `${mainMarker.lat}, ${mainMarker.lng}`;
        returnMarker();
        removePhoto();
        showPopup('success');
      },
      () => showPopup('error'),
      new FormData(evt.target),
    );
  });
};

buttonFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  mapFilters.reset();
  adForm.reset();
  markerGroup.clearLayers();
  getMyAds(data.slice(0, QUANTITY_ADS));
  inputAddress.value = `${mainMarker.lat}, ${mainMarker.lng}`;
  returnMarker();
  removePhoto();
});

export {enableAdForm, enableMapFilters, inputAddress, setUserFormSubmit, inputTitleAd, inputPriceAd, descriptionTextarea, adForm, mapFilters};
