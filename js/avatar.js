import {FILE_TYPES} from './data.js';

const avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const locationFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const locationPhotosElement = document.querySelector('.ad-form__photo');

const loadUserAvatar = () => {

  avatarFileChooserElement.addEventListener('change', () => {

    const file = avatarFileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {

      avatarPreviewElement.src = URL.createObjectURL(file);
    }

  });

};

const loadUserVacationPhoto = () => {

  locationFileChooserElement.addEventListener('change', () => {

    const photo = locationFileChooserElement.files[0];
    const photoName = photo.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => photoName.endsWith(it));

    if (matches) {

      const photoElement = document.createElement('img');
      photoElement.style.width = '70';
      photoElement.style.heigth = '70';
      photoElement.src = URL.createObjectURL(photo);
      locationPhotosElement.appendChild(photoElement);

    }

  });

};

const removeUserPictures = () => {

  avatarPreviewElement.src = 'img/muffin-grey.svg';
  locationPhotosElement.querySelectorAll('img').forEach((element) => element.remove());

};

export {loadUserAvatar, loadUserVacationPhoto, removeUserPictures};
