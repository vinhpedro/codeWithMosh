const Joi = require('joi');
const express = require('express');
const app = express();

// adding a middleware
app.use(express.json());

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'}
];
// GET METHODE
app.get('/', (req, res) => {
    res.send('Hello!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   let course = courses.find(number => number.id === parseInt(req.params.id));
   if(!course) {
       return res.status(404).send('The course with given ID was not found');
   }
   res.send(course);
});

// POST METHODE
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

//PUT METHODE
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

app.delete('/api/courses/:id', (req,res) => {
    //  TODO Look up the course
    //      if not existing, return 404
    //      delete
    //      return the same course
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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on poort ${port}...`));