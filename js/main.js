let getRandomIntNumber = (min, max) => {

    if (min >= max || min < 0 || max < 0) {

        console.log('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

    }

    min = Math.ceil(min);
    max = Math.floor(max);

    let Intnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return Intnumber;

}

console.log(getRandomIntNumber(0, 15));


let getRandomNumber = (min, max, count) => {

    if (min >= max || min < 0 || max < 0) {

        console.log('Значения до и после должны быть положительными числами, а значение до должно быть меньше значения после');

    }

    min = Math.ceil(min);
    max = Math.floor(max);

    let number = Math.random() * (max - min + 1) + min;

    return number.toFixed(count);

}

console.log(getRandomNumber(0, 15, 2));


