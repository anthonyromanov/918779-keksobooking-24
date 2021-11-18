import {filtersElement} from './form.js';

const vacationSelectElement = filtersElement.querySelector('#housing-type');
const priceSelectElement = filtersElement.querySelector('#housing-price');
const roomsSelectElement = filtersElement.querySelector('#housing-rooms');
const guestsSelectElement = filtersElement.querySelector('#housing-guests');

// Фильтрация по типу жилья
const filterByVacation = (advertise) => {

  if (vacationSelectElement.value === 'any') {

    return true;

  }

  return vacationSelectElement.value === advertise.offer.type;
};

// Фильтрация по цене
const filterByPrice = (advertise) => {

  if (priceSelectElement.value === 'any') {

    return true;

  }

  if (priceSelectElement.value === 'low' && advertise.offer.price >= 0 && advertise.offer.price < 10000) {

    return true;

  }

  if (priceSelectElement.value === 'middle' && advertise.offer.price >= 10000 && advertise.offer.price <= 50000) {

    return true;

  }

  return priceSelectElement.value === 'high' && advertise.offer.price > 50000;

};

// Фильтрация по количеству комнат
const filterByRooms = (advertise) => {

  if (roomsSelectElement.value === 'any') {

    return true;

  }

  return Number(roomsSelectElement.value) === advertise.offer.rooms;

};

// Фильтрация по количеству гостей
const filterByGuests = (advertise) => {

  if (guestsSelectElement.value === 'any') {

    return true;

  }

  return Number(guestsSelectElement.value) === advertise.offer.guests;

};

// Фильтрация по удобствам в жилье
const filterByFeatures = (advertise) => {

  const features = advertise.offer.features || [];

  const featuresListElement = filtersElement.querySelectorAll('.map__checkbox:checked');

  const featuresSelected = Array.from(featuresListElement).map((input) => input.value);

  return !featuresSelected.some((element) => !features.includes(element));

};

const mapFiltersList = (advertise) =>

  filterByVacation(advertise)
  && filterByPrice(advertise)
  && filterByRooms(advertise)
  && filterByGuests(advertise)
  && filterByFeatures(advertise);

export {mapFiltersList};
