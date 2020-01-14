/*getCustomer(2, (customer)=> {
   console.log(customer);
   if(customer.isGold) {
       getTopMovies((topMovie) => {
           console.log(topMovie);
           sendEmail(customer.email, topMovie,(data) => {
               console.log(`email send....${data}`);
           });
       });
   }
});*/

async function notifyCustomer() {
    const customer = await getCustomer(3);
    console.log(customer);
    if (customer.isGold) {
        const topMovie = await getTopMovies();
        console.log(topMovie);
        const email = await sendEmail(customer.email, topMovie);
        console.log(`email send....${email}`);
    }
}
notifyCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getCustomer .......');
                resolve({
                id: id,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getTopMovies .......');
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('sending email .......');
            resolve([email, movies]);
        }, 4000);
    });
}