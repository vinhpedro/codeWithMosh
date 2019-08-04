let _ = require('underscore');

let result = _.contains({ adress : 'asingastraat', 'sureName': 'reza'}, 'asingastraat');

let result2 = _.contains([1,2,3,4,5,66,7], 66);

console.log(result);
console.log(result2);