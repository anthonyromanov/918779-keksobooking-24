import {addMarkers, sendFilters} from './map.js';
import {getData} from './api.js';
import {sendData} from './api.js';
import {formElement, resetForm, showMessageWindow} from './form.js';
import {showWarning} from './utils.js';
import {loadUserAvatar, loadUserVacationPhoto, removeUserPictures} from './avatar.js';

const onFormSuccess = () => {

  showMessageWindow('success');
  resetForm();
  removeUserPictures();

};

const onFormError = () => {

  showMessageWindow('error');

};

getData((advertiseList) => {

  addMarkers(advertiseList);
  sendFilters(advertiseList);

}, showWarning);

sendData(formElement, onFormSuccess, onFormError);

loadUserAvatar();
loadUserVacationPhoto();
