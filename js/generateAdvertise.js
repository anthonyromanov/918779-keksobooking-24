const getLocationType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertiseTemplate = document.querySelector('#card').content.querySelector('.popup');
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

  return advertiseCard;

};

export {generateAdvertise};
