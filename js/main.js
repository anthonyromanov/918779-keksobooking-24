const getRandomIntNumber = (min, max) => {

  if (min >= max || min < 0 || max < 0) {

    print('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const Intnumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return Intnumber;
}

getRandomIntNumber(0, 15);

const getRandomNumber = (min, max, count) => {

  if (min >= max || min < 0 || max < 0) {

    print('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const number = Math.random() * (max - min + 1) + min;

  return number.toFixed(count);
}

getRandomNumber(0, 15, 2);
