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

export {getRandomIntNumber, getRandomNumber};
