import {DEFAULT_LOCATION, resetMap} from './map.js';
import {MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_TYPE_PRICE} from './data.js';
import {removeUserPictures} from './avatar.js';

const advertiseForm = document.querySelector('.ad-form');
const allAdvertiseFieldsForm = advertiseForm.querySelectorAll('fieldset');
const advertiseFormTitle = document.querySelector('.notice__title');
const mapFilters = document.querySelector('.map__filters');
const filtersList = mapFilters.querySelectorAll('.map__filter');

const advertiseTitle = advertiseForm.querySelector('#title');
const quantityRoom = advertiseForm.querySelector('#room_number');
const сapacityRoom = advertiseForm.querySelector('#capacity');
const roomGuests = сapacityRoom.querySelectorAll('option');
const typeRoom = advertiseForm.querySelector('#type');
const priceRoom = advertiseForm.querySelector('#price');
const timeInRoom = advertiseForm.querySelector('#timein');
const timeOutRoom = advertiseForm.querySelector('#timeout');


// Неактивный статус страницы
const nonActiveStatus = () => {
  advertiseForm.classList.add('ad-form--disabled');
  advertiseFormTitle.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  allAdvertiseFieldsForm.forEach((element) => {

    element.disabled = true;

  });

  filtersList.forEach((element) => {

    element.disabled = true;

  });

};

// Активный статус страницы
const activeStatus = () => {
  advertiseForm.classList.remove('ad-form--disabled');
  advertiseFormTitle.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  allAdvertiseFieldsForm.forEach((element) => {

    element.disabled = false;

  });

  filtersList.forEach((element) => {

    element.disabled = false;

  });

};

// Проверяет количество символов в заголовке объявления до отправки формы

advertiseTitle.addEventListener('input', () => {

  const valueLength = advertiseTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {

    advertiseTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);

  } else if (valueLength > MAX_TITLE_LENGTH) {

    advertiseTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);

  } else {

    advertiseTitle.setCustomValidity('');

  }

  advertiseTitle.reportValidity();

});

// Проверяет цены за ночь по типу жилья

typeRoom.addEventListener('change', (evt) => {

  const minPrice = MIN_TYPE_PRICE[evt.target.value];

  priceRoom.min = minPrice;

  priceRoom.placeholder = minPrice.toString();

});

// Синхронизирует времени въезда в номер и время выезда из номера

timeInRoom.addEventListener('change', (evt) => {

  timeOutRoom.value = evt.target.value;

});

timeOutRoom.addEventListener('change', (evt) => {

  timeInRoom.value = evt.target.value;

});

// Валидация количества комнат и количества гостей

const selectRoom = () => {

  const selectedValue = (quantityRoom.value === '100') ? '0' : quantityRoom.value;

  for (let i = 0; i < roomGuests.length; i++) {

    roomGuests[i].hidden = true;
    roomGuests[i].removeAttribute('selected');

    if (roomGuests[i].value === selectedValue) {

      roomGuests[i].hidden = false;
      roomGuests[i].setAttribute('selected', '');
    }

    if (roomGuests[i].value <= selectedValue && roomGuests[i].value > 0) {

      roomGuests[i].hidden = false;
      roomGuests[i].setAttribute('selected', '');
    }
  }
};

selectRoom();

quantityRoom.addEventListener('change', () => {

  selectRoom();

});

const showMessageWindow = (templateId) => {
  const body = document.querySelector('body');
  const messageTemplate = document.querySelector(`#${templateId}`).content;
  const message = messageTemplate.firstElementChild.cloneNode(true);
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
      window.removeEventListener('keydown', onEscPress);
    }
  };
  const onMessagePress = () => {
    message.remove();
    window.removeEventListener('keydown', onEscPress);
  };
  message.addEventListener('click', onMessagePress);
  window.addEventListener('keydown', onEscPress);
  body.appendChild(message);
};

const address = advertiseForm.querySelector('#address');

const resetForm = () => {
  advertiseForm.reset();
  resetMap();
  address.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;
};

const resetButton = advertiseForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  removeUserPictures();
});

export {nonActiveStatus, activeStatus, advertiseForm, showMessageWindow, resetForm};
