const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const inputTitleAd = adForm.querySelector('.ad-form__input-title');
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;

const inputPriceAd = adForm.querySelector('.ad-form__input-price');
const MIN_VALUE_PRICE = 0;
const MAX_VALUE_PRICE = 1000000;

const choiceRooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

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
const timeOptions = adForm.querySelectorAll('.ad-form__choose-time');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
};
disableAdForm();

const disableMapFilters = () => {
  mapFilters.classList.add('ad-form--disabled');
  for (let i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].setAttribute('disabled', 'disabled');
  }
};
disableMapFilters();

const enabledAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
};
enabledAdForm();

const enableMapFilters = () => {
  mapFilters.classList.remove('ad-form--disabled');
  for (let i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].removeAttribute('disabled');
  }
};
enableMapFilters();

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

  if (valuePrice < MIN_VALUE_PRICE) {
    inputPriceAd.setCustomValidity('Минимальная цена не должна быть отрицательной');
  } else if (valuePrice > MAX_VALUE_PRICE) {
    inputPriceAd.setCustomValidity('Максимальная цена не должна превышать 1000000');
  } else {
    inputPriceAd.setCustomValidity('');
  }

  inputPriceAd.reportValidity();
});

const validateRooms = (index) => {
  const currentOfRooms = numberOfRooms[index];
  let isSelectedChanged = false;
  for (let i = 0; i < capacity.options.length; i++) {
    capacity.options[i].removeAttribute('selected');
  }

  for (let i = 0; i < capacity.options.length; i++) {
    const value = capacity.options[i].value;
    if (currentOfRooms.includes(value)) {
      capacity.options[i].setAttribute('style', 'display:block');
      if (!isSelectedChanged) {
        capacity.options[i].setAttribute('selected', 'selected');
        isSelectedChanged = true;
      }
    } else {
      capacity.options[i].setAttribute('style', 'display:none');
    }
  }
};

validateRooms(1);

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

for (let i = 0; i < timeOptions.length; i++) {

  timeOptions[i].addEventListener('change', () => {
    const id = timeOptions[i].getAttribute('id');
    let select;

    if (id === 'timein') {
      select = timeOut;
    } else if (id === 'timeout') {
      select = timeIn;
    }

    return select.value = timeOptions[i].value;
  });
}
