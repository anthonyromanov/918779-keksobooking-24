import {nonActiveStatus, activeStatus} from './form.js';
import {renderAdvertise, generateAdvertise} from './generateAdvertise.js';

nonActiveStatus();

const DEFAULT_LAT_LOCATION = 35.68770;
const DEFAULT_LNG_LOCATION = 139.75433;
const ZOOM = 10;

const address = document.querySelector('#address');

// Создаем карту, центрируем и масштабируем

const map = L.map('map-canvas')

  .on('load', () => {

    activeStatus();

    address.value = `${DEFAULT_LAT_LOCATION}, ${DEFAULT_LNG_LOCATION}`;

  })

  .setView({

    lat: DEFAULT_LAT_LOCATION,
    lng: DEFAULT_LNG_LOCATION,

  }, ZOOM);

// Показываем карту

L.tileLayer(

  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  {

    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',

  },

).addTo(map);

// Показываем ГЛАВНУЮ метку
const mainPinIcon = L.icon ({

  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],

});

// Добавление метки на карту
// Исходное состояние метки и возможность её перемещения

const mainPinMarker = L.marker(

  {
    lat: DEFAULT_LAT_LOCATION,
    lng: DEFAULT_LNG_LOCATION,
  },

  {
    draggable: true,
    icon: mainPinIcon,
  },

);

mainPinMarker.addTo(map);

// Обработчик событий метки. Возвращает новые координаты
mainPinMarker.on('moveend', (evt) => {
  const mainPinLocation = evt.target.getLatLng();
  address.value = `${mainPinLocation.lat.toFixed(5)}, ${mainPinLocation.lng.toFixed(5)}`;
});

// Отображение меток объявлений
// Их расположение на карте по полученным данным
// Показ балуна

renderAdvertise.forEach((advertise) => {

  const icon = L.icon({

    iconUrl: 'img/pin.svg',

    iconSize: [40, 40],

    iconAnchor: [20, 40],

  });

  const { location: {lat, lng} } = advertise;

  const marker = L.marker({

    lat,
    lng,

  },

  {

    icon,

  });

  marker.addTo(map).bindPopup(generateAdvertise(advertise));

});
