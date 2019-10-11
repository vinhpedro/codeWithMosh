const Joi = require('joi');
const logger =require('./logger');
const authetincation = require('./authentication');
const express = require('express');
const app = express();

// adding a middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(logger);

app.use(authetincation);

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'}
];

// GET METHODE
app.get('/', (req, res) => {
    res.send('Hello Reza!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET METHODE GET COURSE
app.get('/api/courses/:id', (req, res) => {
   let course = courses.find(number => number.id === parseInt(req.params.id));
   if(!course) {
       return res.status(404).send('The course with given ID was not found');
   }
   res.send(course);
});

// POST METHODE CREATE course
app.post('/api/courses', (req, res) => {

    const {error} = validateCourse(req.body); // result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT METHODE UPDATING  couurs
app.put('/api/courses/:id', (req, res) => {

    let course = courses.find(number => number.id === parseInt(req.params.id));

    if(!course) {
        return res.status(404).send('The course with given ID was not found');
    }

    const {error} = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

//  DELETE METHODE DELETE COURSE
app.delete('/api/courses/:id', (req,res) => {

    // look up the course
    let course = courses.find(number => number.id === parseInt(req.params.id));
    // if not  existing, return 404
    if(!course ) {
        return res.status(404).send('The course witn given ID was not found');
    }

    //delete course
    /*for( let i = 0; i < courses.length; i++){
        if ( courses[i] === course) {
            courses.splice(i, 1);
        }
    }*/
    //OR
    let index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
// ------------------------------------------------------------------------
app.get('/api/posts/:year/:month', (req, res) => {
    // params request
   /* res.send(req.params);*/
    // query request
    res.send(req.query);
});

// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listening on poort ${port}...`));