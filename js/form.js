const advertiseForm = document.querySelector('.ad-form');
const advertiseFilters = document.querySelector('.map__filters');
const allFieldsForm = advertiseForm.querySelectorAll('fieldset');
const advertiseFormTitle = document.querySelector('.notice__title');

// Неактивный статус страницы
const nonActiveStatus = () => {
  advertiseForm.classList.add('ad-form--disabled');
  advertiseFilters.classList.add('ad-form--disabled');
  advertiseFormTitle.classList.add('ad-form--disabled');

  allFieldsForm.forEach((element) => {

    element.disabled = true;

  });

};

// Активный статус страницы
const activeStatus = () => {
  advertiseForm.classList.remove('ad-form--disabled');
  advertiseFilters.classList.remove('ad-form--disabled');
  advertiseFormTitle.classList.remove('ad-form--disabled');

  allFieldsForm.forEach((element) => {

    element.disabled = false;

  });

};

export {nonActiveStatus, activeStatus};
