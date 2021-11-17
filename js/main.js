import {addMarkers} from './map.js';
import {getData} from './api.js';
import {sendData} from './api.js';
import {advertiseForm, resetForm, showMessageWindow} from './form.js';
import {showWarning} from './utils.js';

const onFormSuccess = () => {

  showMessageWindow('success');
  resetForm();

};

const onFormError = () => {

  showMessageWindow('error');

};

getData(addMarkers, showWarning);
sendData(advertiseForm, onFormSuccess, onFormError);
