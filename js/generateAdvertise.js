const getLocationType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const popupPhotoTemplateElement = document.querySelector('#card').content.querySelector('.popup__photo');

const showVacationPhotos = (array = []) => {
  const vacationPhotos = [];
  array.forEach((item) => {
    const photosTemplate = popupPhotoTemplateElement.cloneNode(true);
    photosTemplate.src = item;
    vacationPhotos.push(photosTemplate);
  });
  return vacationPhotos;

};

const generateAdvertise = ({offer, author}) => {

  const advertiseElement = popupTemplateElement.cloneNode(true);

  const title = offer.title;
  const titleElement = advertiseElement.querySelector('.popup__title');
  const address = offer.address;
  const addressElement = advertiseElement.querySelector('.popup__text--address');
  const price = offer.price;
  const priceElement = advertiseElement.querySelector('.popup__text--price');
  const type = getLocationType[offer.type];
  const typeElement = advertiseElement.querySelector('.popup__type');
  const rooms = offer.rooms;
  const guests = offer.guests;
  const capacityElement = advertiseElement.querySelector('.popup__text--capacity');
  const checkin = offer.checkin;
  const checkout = offer.checkout;
  const timeElement = advertiseElement.querySelector('.popup__text--time');
  const features = offer.features;
  const featuresElement = advertiseElement.querySelector('.popup__features');
  const description = offer.description;
  const descriptionElement = advertiseElement.querySelector('.popup__description');
  const avatar = author.avatar;
  const avatarElement = advertiseElement.querySelector('.popup__avatar');
  const photosElement = advertiseElement.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  const photoGallery = showVacationPhotos(offer.photos);


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

  photoElement.remove();

  if (photoGallery.length) {
    photosElement.append(...photoGallery);
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

  return advertiseElement;

};

export {generateAdvertise};
