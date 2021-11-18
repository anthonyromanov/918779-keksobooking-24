import {DEFAULT_LOCATION, resetMap} from './map.js';
import {MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_TYPE_PRICE} from './data.js';
import {removeUserPictures} from './avatar.js';

const formElement = document.querySelector('.ad-form');
const formFieldsElement = formElement.querySelectorAll('fieldset');
const formTitleElement = document.querySelector('.notice__title');
const filtersElement = document.querySelector('.map__filters');
const filtersListElement = filtersElement.querySelectorAll('.map__filter');

const titleNameElement = formElement.querySelector('#title');
const quantityRoomElement = formElement.querySelector('#room_number');
const сapacityRoomElement = formElement.querySelector('#capacity');
const roomGuestsElement = сapacityRoomElement.querySelectorAll('option');
const typeRoomElement = formElement.querySelector('#type');
const priceRoomElement = formElement.querySelector('#price');
const timeInRoomElement = formElement.querySelector('#timein');
const timeOutRoomElement = formElement.querySelector('#timeout');

const addressElement = formElement.querySelector('#address');
const resetButtonElement = formElement.querySelector('.ad-form__reset');


// Неактивный статус страницы
const EnableNonActiveStatus = () => {
  formElement.classList.add('ad-form--disabled');
  formTitleElement.classList.add('ad-form--disabled');
  filtersElement.classList.add('map__filters--disabled');

  formFieldsElement.forEach((element) => {

    element.disabled = true;

  });

  filtersListElement.forEach((element) => {

    element.disabled = true;

  });

};

// Активный статус страницы
const EnableActiveStatus = () => {
  formElement.classList.remove('ad-form--disabled');
  formTitleElement.classList.remove('ad-form--disabled');
  filtersElement.classList.remove('map__filters--disabled');

  formFieldsElement.forEach((element) => {

    element.disabled = false;

  });

  filtersListElement.forEach((element) => {

    element.disabled = false;

  });

};

// Проверяет количество символов в заголовке объявления до отправки формы

titleNameElement.addEventListener('input', () => {

  const valueLength = titleNameElement.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {

    titleNameElement.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);

  } else if (valueLength > MAX_TITLE_LENGTH) {

    titleNameElement.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);

  } else {

    titleNameElement.setCustomValidity('');

  }

  titleNameElement.reportValidity();

});

// Проверяет цены за ночь по типу жилья

typeRoomElement.addEventListener('change', (evt) => {

  const minPrice = MIN_TYPE_PRICE[evt.target.value];

  priceRoomElement.min = minPrice;

  priceRoomElement.placeholder = minPrice.toString();

});

// Синхронизирует времени въезда в номер и время выезда из номера

timeInRoomElement.addEventListener('change', (evt) => {

  timeOutRoomElement.value = evt.target.value;

});

timeOutRoomElement.addEventListener('change', (evt) => {

  timeInRoomElement.value = evt.target.value;

});

// Валидация количества комнат и количества гостей

const selectRoom = () => {

  const selectedValue = (quantityRoomElement.value === '100') ? '0' : quantityRoomElement.value;

  roomGuestsElement.forEach((element) => {

    element.hidden = true;
    element.removeAttribute('selected');

    if (element.value === selectedValue) {

      element.hidden = false;
      element.setAttribute('selected', '');
    }

    if (element.value <= selectedValue && element.value > 0) {

      element.hidden = false;
      element.setAttribute('selected', '');
    }
    
  });

};

selectRoom();

quantityRoomElement.addEventListener('change', () => {

  selectRoom();

});

const showMessageWindow = (templateId) => {
  const bodyElement = document.querySelector('body');
  const messageTemplateElement = document.querySelector(`#${templateId}`).content;
  const messageElement = messageTemplateElement.firstElementChild.cloneNode(true);
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      messageElement.remove();
      window.removeEventListener('keydown', onEscPress);
    }
  };
  const onMessagePress = () => {
    messageElement.remove();
    window.removeEventListener('keydown', onEscPress);
  };
  messageElement.addEventListener('click', onMessagePress);
  window.addEventListener('keydown', onEscPress);
  bodyElement.appendChild(messageElement);
};

const resetForm = () => {
  formElement.reset();
  resetMap();
  addressElement.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;
};

resetButtonElement.addEventListener('click', (evt) => {

  evt.preventDefault();
  resetForm();
  removeUserPictures();
  
});

export {EnableNonActiveStatus, EnableActiveStatus, formElement, showMessageWindow, resetForm, addressElement, filtersElement};
