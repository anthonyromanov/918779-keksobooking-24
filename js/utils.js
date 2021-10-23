import {PLACEMENT, PLACE_DESCRIPTION, TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS, MIN, LOCATION_COUNT, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, MIN_PRICE, MAX_PRICE, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG} from './data.js';

//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomIntNumber = (min, max) => {

  if (min >= max || min < 0 || max < 0) {

    throw new Error('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const Intnumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return Intnumber;

};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат

const getRandomNumber = (min, max, count) => {

  if (min >= max || min < 0 || max < 0) {

    throw new Error('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const number = Math.random() * (max - min) + min;

  return number.toFixed(count);

};

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

const createOffer = () => {

  const X_COORD = createLocation().lat;
  const Y_COORD = createLocation().lng;

  return {

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
    photos: PHOTOS[getRandomIntNumber(MIN, PHOTOS.length - 1)],
  };

};

export {createAuthor, createOffer, createLocation};
