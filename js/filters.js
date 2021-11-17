const mapFilters = document.querySelector('.map__filters');
const locationSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');

// Фильтрация по типу жилья
const filterByVacation = (advertise) => {

  if (locationSelect.value === 'any') {

    return true;

  }

  return locationSelect.value === advertise.offer.type;
};

// Фильтрация по цене
const filterByPrice = (advertise) => {

  if (priceSelect.value === 'any') {

    return true;

  }

  if (priceSelect.value === 'low' && advertise.offer.price >= 0 && advertise.offer.price < 10000) {

    return true;

  }

  if (priceSelect.value === 'middle' && advertise.offer.price >= 10000 && advertise.offer.price <= 50000) {

    return true;

  }

  return priceSelect.value === 'high' && advertise.offer.price > 50000;

};

// Фильтрация по количеству комнат
const filterByRooms = (advertise) => {

  if (roomsSelect.value === 'any') {

    return true;

  }

  return Number(roomsSelect.value) === advertise.offer.rooms;

};

// Фильтрация по количеству гостей
const filterByGuests = (advertise) => {

  if (guestsSelect.value === 'any') {

    return true;

  }

  return Number(guestsSelect.value) === advertise.offer.guests;

};

// Фильтрация по удобствам в жилье
const filterByFeatures = (advertise) => {

  const features = advertise.offer.features || [];

  const featuresList = mapFilters.querySelectorAll('.map__checkbox:checked');

  const featuresSelected = Array.from(featuresList).map((input) => input.value);

  return !featuresSelected.some((element) => !features.includes(element));

};

const mapFiltersList = (advertise) =>

  filterByVacation(advertise)
  && filterByPrice(advertise)
  && filterByRooms(advertise)
  && filterByGuests(advertise)
  && filterByFeatures(advertise);

export {mapFiltersList};
