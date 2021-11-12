import {getRandomIntNumber, getRandomNumber} from './utils.js';
import {PLACEMENT, PLACE_DESCRIPTION, TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS, MIN, COUNT, LOCATION_COUNT, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, MIN_PRICE, MAX_PRICE, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG} from './data.js';


//Функция создания автора объявления

const createAuthor = () => {

  let num = getRandomIntNumber(MIN_GUESTS, MAX_GUESTS);

  if (num < MAX_GUESTS) {

    num = String(num).padStart(2,'0');

  }

  num = String(num);

  return {

    avatar: `img/avatars/user${num}.png`,

  };

};

//Функция создания локации

const createLocation = () => {

  const lat = getRandomNumber(MIN_LAT, MAX_LAT, LOCATION_COUNT);
  const lng = getRandomNumber(MIN_LNG, MAX_LNG, LOCATION_COUNT);

  return {

    lat,
    lng,

  };

};

//Функция создания объявления

const createAdvertise = () => {

  const X_COORD = createLocation().lat;
  const Y_COORD = createLocation().lng;

  return {

    author: {

      avatar: createAuthor().avatar,

    },

    offer: {

      title: PLACEMENT[getRandomIntNumber(MIN, PLACEMENT.length - 1)],
      address: `${X_COORD}, ${Y_COORD}`,
      price: getRandomIntNumber(MIN_PRICE, MAX_PRICE),
      type: TYPE[getRandomIntNumber(MIN, TYPE.length - 1)],
      rooms: getRandomIntNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: CHECKIN[getRandomIntNumber(MIN, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomIntNumber(MIN, CHECKOUT.length - 1)],
      features: FEATURES[getRandomIntNumber(MIN, FEATURES.length - 1)],
      description: PLACE_DESCRIPTION[getRandomIntNumber(MIN, PLACE_DESCRIPTION.length - 1)],
      photos: PHOTOS.slice(MIN, getRandomIntNumber(MIN, PHOTOS.length)),

    },

    location: {

      lat: X_COORD,
      lng: Y_COORD,

    },

  };

};

// Рендер 10 объектов

const renderAdvertise = Array.from({length: COUNT}, createAdvertise);

renderAdvertise;

const getLocationType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertiseTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertiseListElement = document.querySelector('#map-canvas');
const advertiseListFragment = document.createDocumentFragment();
const advertisePhotoElement = document.querySelector('#card').content.querySelector('.popup__photo');

const generateLocationPhotos = (array) => {
  const newPhotos = [];
  array.forEach((item) => {
    const photoTemplate = advertisePhotoElement.cloneNode(true);
    photoTemplate.src = item;
    newPhotos.push(photoTemplate);
  });
  return newPhotos;
};

const generateAdvertise = (advertise) => {

  const advertiseCard = advertiseTemplate.cloneNode(true);
  advertiseListElement.appendChild(advertiseCard);
  const title = advertise.offer.title;
  const titleElement = advertiseCard.querySelector('.popup__title');
  const address = advertise.offer.address;
  const addressElement = advertiseCard.querySelector('.popup__text--address');
  const price = advertise.offer.price;
  const priceElement = advertiseCard.querySelector('.popup__text--price');
  const type = getLocationType[advertise.offer.type];
  const typeElement = advertiseCard.querySelector('.popup__type');
  const rooms = advertise.offer.rooms;
  const guests = advertise.offer.guests;
  const capacityElement = advertiseCard.querySelector('.popup__text--capacity');
  const checkin = advertise.offer.checkin;
  const checkout = advertise.offer.checkout;
  const timeElement = advertiseCard.querySelector('.popup__text--time');
  const features = advertise.offer.features;
  const featuresElement = advertiseCard.querySelector('.popup__features');
  const description = advertise.offer.description;
  const descriptionElement = advertiseCard.querySelector('.popup__description');
  const avatar = advertise.author.avatar;
  const avatarElement = advertiseCard.querySelector('.popup__avatar');
  const photosElement = advertiseCard.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  photoElement.remove();
  const photosArray = generateLocationPhotos(advertise.offer.photos);

  if (title) {
    titleElement.textContent = title;
  }
  else {
    titleElement.remove();
  }

  if (address) {
    addressElement.textContent = address;
  }
  else {
    addressElement.remove();
  }

  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  }
  else {
    priceElement.remove();
  }

  if (type) {
    typeElement.textContent = type;
  }
  else {
    typeElement.remove();
  }

  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  }
  else {
    capacityElement.remove();
  }

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
  else {
    timeElement.remove();
  }

  if (features) {
    featuresElement.textContent = features;
  }
  else {
    featuresElement.remove();
  }

  if (description) {
    descriptionElement.textContent = description;
  }
  else {
    descriptionElement.remove();
  }

  if (photosArray.length) {
    photosElement.append(...photosArray);
  }
  else {
    photosElement.remove();
  }

  if (avatar) {
    avatarElement.src = avatar;
  }
  else {
    avatarElement.remove();
  }

  advertiseListFragment.appendChild(advertiseCard);
  advertiseListElement.appendChild(advertiseListFragment);

};

export {renderAdvertise, generateAdvertise};
