import {COUNT, createAuthor, createOffer, createLocation} from './utils.js';

// Рендер 10 объектов

const renderAuthor = Array.from({length: COUNT}, createAuthor);
const renderOffer = Array.from({length: COUNT}, createOffer);
const renderLocation = Array.from({length: COUNT}, createLocation);

renderAuthor;
renderOffer;
renderLocation;
