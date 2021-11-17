import {FILE_TYPES} from './data.js';

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const locationFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const locationPhotos = document.querySelector('.ad-form__photo');

const loadUserAvatar = () => {

  avatarFileChooser.addEventListener('change', () => {

    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {

      avatarPreview.src = URL.createObjectURL(file);
    }

  });

};

const loadUserVacationPhoto = () => {

  locationFileChooser.addEventListener('change', () => {

    const photo = locationFileChooser.files[0];
    const photoName = photo.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => photoName.endsWith(it));

    if (matches) {

      const photoElement = document.createElement('img');
      photoElement.style.width = '70';
      photoElement.style.heigth = '70';
      photoElement.src = URL.createObjectURL(photo);
      locationPhotos.appendChild(photoElement);

    }

  });

};

const removeUserPictures = () => {

  avatarPreview.src = 'img/muffin-grey.svg';
  locationPhotos.querySelectorAll('img').forEach((element) => element.remove());

};

export {loadUserAvatar, loadUserVacationPhoto, removeUserPictures};
