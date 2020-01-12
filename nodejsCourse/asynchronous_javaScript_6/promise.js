const p = new Promise((resolve, reject) => {
  // kick off sone async work
    setTimeout(() => {
        /*resolve(1);*/
        reject(new Error('message'));
    }, 2000);

});

// consume the promise

p.then(result => console.log(result))
    .catch(err => console.log('Error', err.message));