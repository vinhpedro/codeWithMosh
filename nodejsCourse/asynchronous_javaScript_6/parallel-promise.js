const p1 = new Promise((resolve, reject) => {
   setTimeout(() => {
     console.log('Async operation1...');
     resolve(1);
       /*reject(new Error('somthing went wrong'));*/
   },4000);
});

const p12= new Promise(resolve => {
    setTimeout(() => {
        console.log('Async operation2...');
        resolve(2);
    },2000);
});

/*Promise.all([p1, p12])*/
Promise.race([p1, p12])
    .then(result => {
        console.log(result);
    }).catch(err => console.log("error", err.message));