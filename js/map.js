import {DEFAULT_LOCATION, ZOOM, COUNT, MAIN_MARKER_ICON_URL, MAIN_MARKER_ICON_SIZES, MAIN_MARKER_ICON_ANCHORS, MARKER_ICON_URL, MARKER_ICON_SIZES, MARKER_ICON_ANCHORS} from './data.js';
import {enableNonActiveStatus, enableActiveStatus, addressElement, filtersElement} from './form.js';
import {generateAdvertise} from './generateAdvertise.js';
import {mapFiltersList} from './filters.js';
import {debounce} from './utils/debounce.js';

enableNonActiveStatus();

const markers = [];

// Создаем карту, центрируем и масштабируем

const map = L.map('map-canvas')

  .on('load', () => {

    enableActiveStatus();

    addressElement.value = DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng;

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

  iconUrl: MAIN_MARKER_ICON_URL,
  iconSize: MAIN_MARKER_ICON_SIZES,
  iconAnchor: MAIN_MARKER_ICON_ANCHORS,

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

addressElement.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;

// Обработчик событий метки. Возвращает новые координаты
mainMarker.on('moveend', (evt) => {
  const mainPinLocation = evt.target.getLatLng();
  addressElement.value = `${mainPinLocation.lat.toFixed(5)}, ${mainPinLocation.lng.toFixed(5)}`;
});

// Отображение меток объявлений
// Их расположение на карте по полученным данным
// Показ балуна

const addMarkers = (advertiseList) => {

  markers.forEach((marker) => {
    marker.remove();
  });

  advertiseList
    .slice()
    .filter(mapFiltersList)
    .slice(0, COUNT).forEach((advertise) => {

      const icon = L.icon({
        iconUrl: MARKER_ICON_URL,
        iconSize: MARKER_ICON_SIZES,
        iconAnchor: MARKER_ICON_ANCHORS,
      });
      const {location: {lat, lng}} = advertise;
      const marker = L.marker({
        lat,
        lng,
      },
      {
        icon,
      });

      markers.push(marker);

      marker
        .addTo(map)
        .bindPopup(generateAdvertise(advertise));

    });
};

const resetMap = () => {
  map.closePopup();
  map.setView(DEFAULT_LOCATION, ZOOM);
  mainMarker.setLatLng(DEFAULT_LOCATION);
};

const sendFilters = (advertiseList) => {
  filtersElement.addEventListener('change', debounce(() => addMarkers(advertiseList)));
};

export {addMarkers, resetMap, DEFAULT_LOCATION, sendFilters};
