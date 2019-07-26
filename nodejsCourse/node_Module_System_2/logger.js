let url = 'http://rezafitriaman.io/log';
function log(message) {
    //send an HTTP request
    console.log(message);
}

// u can write it to an export-object
/*module.exports.log = log;
module.exports.url = url;*/

// or u can rewrite it to for a single function
module.exports = log;