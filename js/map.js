import {COUNT, DEFAULT_LOCATION, ZOOM} from './data.js';
import {nonActiveStatus, activeStatus, advertiseForm} from './form.js';
import {generateAdvertise} from './generateAdvertise.js';

const address = advertiseForm.querySelector('#address');

nonActiveStatus();

// Создаем карту, центрируем и масштабируем

const map = L.map('map-canvas')

  .on('load', () => {

    activeStatus();

    address.value = DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng;

  })

  .setView(DEFAULT_LOCATION, ZOOM);

// Показываем карту

L.tileLayer(

  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  {

    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',

  },

).addTo(map);

// Показываем ГЛАВНУЮ метку
const mainMarkerIcon = L.icon ({

  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],

});

// Добавление метки на карту
// Исходное состояние метки и возможность её перемещения

const mainMarker = L.marker(

  DEFAULT_LOCATION,

  {
    draggable: true,
    icon: mainMarkerIcon,
  },

);

mainMarker.addTo(map);

address.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;

// Обработчик событий метки. Возвращает новые координаты
mainMarker.on('moveend', (evt) => {
  const mainPinLocation = evt.target.getLatLng();
  address.value = `${mainPinLocation.lat.toFixed(5)}, ${mainPinLocation.lng.toFixed(5)}`;
});

// Отображение меток объявлений
// Их расположение на карте по полученным данным
// Показ балуна

const addMarkers = (advertiseList) => {
  advertiseList.slice(0, COUNT).forEach((advertise) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const { location: {lat,lng}} = advertise;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    });
    marker.addTo(map).bindPopup(generateAdvertise(advertise));
  });
};

const resetMap = () => {
  map.closePopup();
  map.setView(DEFAULT_LOCATION, ZOOM);
  mainMarker.setLatLng(DEFAULT_LOCATION);
};

export {addMarkers, resetMap, DEFAULT_LOCATION};
