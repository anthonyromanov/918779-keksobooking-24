const PLACEMENT = [
  'Квартира для свиданий',
  'Шикарная студия в центре города',
  'Апартаменты с видом на пляж',
  'Уютная квартира с джакуззи и панорамными окнами',
  'Квартира рядом с парком для любителей животных',
];

const PLACE_DESCRIPTION = [
  'Светлая квартира с огромной кроватью для двоих',
  'Дизайнерская мебель, обстановка уюта и комфорта',
  'Романтическая обстановка, большое джакуззи и оргомные окна от пола до потолка с видом на город',
  'Звукопоглащающие окна, современная техника, удобная и мягкая кровать, мебель на заказ от Александра Устюгова',
  'Квартира для любителей животных. Мягкие ковры, мебель с защитой от игривых лап ваших питомцев. Рядом огромный парк для прогулок',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN = 0;
const COUNT = 10;
const LOCATION_COUNT = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 5;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 1000;
const MAX_PRICE = 30000;

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;

const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

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

// Рендер 10 объектов

const renderAuthor = Array.from({length: COUNT}, createAuthor);
const renderOffer = Array.from({length: COUNT}, createOffer);
const renderLocation = Array.from({length: COUNT}, createLocation);

renderAuthor;
renderOffer;
renderLocation;
