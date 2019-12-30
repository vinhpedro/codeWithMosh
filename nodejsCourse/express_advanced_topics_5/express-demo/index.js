const startupDebuger = require('debug')('app:startup');
const dbDebuger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger =require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authetincation = require('./middleware/authentication');
const express = require('express');
const app = express();

// templating engine
app.set('view engine', 'pug');
app.set('views', './views'); // optionals becouse this is a default element

// adding a middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

// configuration
startupDebuger(`Applcitation name: ${config.get('name')}`);
startupDebuger(`Mail server: ${config.get('mail.host')}`);
startupDebuger(`Mail password: ${config.get('mail.password')}`); // set app_password=1234 for custom-enviroment-variables.json

// enviroment variable
startupDebuger(`NODE_ENV: ${process.env.NODE_ENV}`);
startupDebuger(`app: ${app.get('env')}`);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebuger('morgan is enabled s');
}

// database work console.log
dbDebuger('connected with database');

// custom middleware
app.use(logger);
app.use(authetincation);

// GET METHODE
app.use('/', home);
app.use('/api/courses', courses);

// ------------------------------------------------------------------------
app.get('/api/posts/:year/:month', (req, res) => {
    // params request
   /* res.send(req.params);*/
    // query request
    res.send(req.query);
});
// ------------------------------------------------------------------------

// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listening on poort ${port}...`));