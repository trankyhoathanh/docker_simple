const moment = require('moment');  

let a = moment();
let b = moment('2022/10/10', 'YYYY/M/D').add(-1, "days");

let dif = moment.duration(b.diff(a)).asSeconds();
let to = moment().add(dif, "seconds")


console.log(a);
console.log(b);
console.log(dif);
console.log(to);