const fs = require('fs');
// sync
//let filesSync = fs.readdirSync('./');

// async
fs.readdir('./', "utf8", (err, files) => {
   if(err) throw err;
    else console.log(files);
});

//module.exports.filesSync = filesSync;