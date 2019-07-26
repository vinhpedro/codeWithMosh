const os = require('os');

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

exports.totalMemory = totalMemory;
exports.freeMemory = freeMemory;