//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomIntNumber = (min, max) => {

  if (min >= max || min < 0 || max < 0) {

    throw new Error('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const Intnumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return Intnumber;

};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат

const getRandomNumber = (min, max, count) => {

  if (min >= max || min < 0 || max < 0) {

    throw new Error('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const number = Math.random() * (max - min) + min;

  return number.toFixed(count);

};

const WARNING_SHOW_TIME = 5000;

const showWarning = () => {
  const warningWrapper = document.createElement('div');
  warningWrapper.style.zIndex = 100;
  warningWrapper.style.position = 'absolute';
  warningWrapper.style.left = 0;
  warningWrapper.style.top = 0;
  warningWrapper.style.right = 0;
  warningWrapper.style.padding = '10px 3px';
  warningWrapper.style.fontSize = '30px';
  warningWrapper.style.textAlign = 'center';
  warningWrapper.style.backgroundColor = 'red';

  warningWrapper.textContent = 'Ошибка сервера';

  document.body.append(warningWrapper);

  setTimeout(() => {
    warningWrapper.remove();
  }, WARNING_SHOW_TIME);
};

export {getRandomIntNumber, getRandomNumber, showWarning};
