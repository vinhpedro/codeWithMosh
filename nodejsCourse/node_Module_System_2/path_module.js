// try to to write path module from node-module
const path = require('path');
let pathObj = path.parse(module.filename);

// export the variable
module.exports = pathObj;