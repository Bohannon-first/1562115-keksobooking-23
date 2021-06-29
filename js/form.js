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


const choiceRooms = adForm.querySelector('#room_number'); // 1-й select
const capacity = adForm.querySelector('#capacity'); // 2-й select
const choiceRoomsElements = choiceRooms.querySelectorAll('option'); // Коллекция option'ов

choiceRooms.addEventListener('change', () => {
  const index = Number(choiceRooms.value);
  // console.log(index);

  if (index === 1) {
    console.log('Ты выбрал одну комнату');
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[1].setAttribute('disabled', 'disabled');
    capacity.options[2].setAttribute('selected', 'selected');
    capacity.options[3].setAttribute('disabled', 'disabled');
  } else if (index === 2) {
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[1].setAttribute('selected', 'selected');
    capacity.options[3].setAttribute('disabled', 'disabled');
    console.log('Ты выбрал две комнаты');
  } else if (index === 3) {
    capacity.options[0].setAttribute('selected', 'selected');
    capacity.options[3].setAttribute('disabled', 'disabled');
    console.log('Ты выбрал три комнаты');
  } else if (index === 100) {
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[1].setAttribute('disabled', 'disabled');
    capacity.options[2].setAttribute('disabled', 'disabled');
    capacity.options[3].setAttribute('selected', 'selected');
    console.log('Ты выбрал сто комнат');
  } else {

  }
});

// const handlerRooms = function (evt) {
//   if (evt.target.textContent === '1 комната') {
//     console.log('Ты выбрал одну комнату');
//   }
// };
// choiceRooms.addEventListener('change', handlerRooms);


// console.log(choiceRoomsElements);
// choiceRoomsElements.forEach((choiceRoomsElement) => {
//   choiceRoomsElement.addEventListener('click', () => {
//     console.log('Клик!');
//   });
// });


// choiceRooms.addEventListener('change', (evt) => {
//   if (evt.choiceRoomsElements[0]) {
//     console.log('Ты выбрал одну комнату');
//   } else if (evt.choiceRoomsElements[1]) {
//     console.log('Ты выбрал две комнаты');
//   } else if (evt.choiceRoomsElements[2]) {
//     console.log('Ты выбрал три комнаты');
//   } else if (evt.choiceRoomsElements[3]) {
//     console.log('Ты выбрал сто комнат');
//   }
// });
