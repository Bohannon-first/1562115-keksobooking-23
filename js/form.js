const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

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


const inputTitleAd = adForm.querySelector('.ad-form__input-title');
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;

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

const inputPriceAd = adForm.querySelector('.ad-form__input-price');
const MIN_VALUE_PRICE = 0;
const MAX_VALUE_PRICE = 1000000;

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


const choiceRooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

choiceRooms.addEventListener('click', () => {
  if () {
    capacity.remove();
  }
});
