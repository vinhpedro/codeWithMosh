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
       res.status(404).send('The course with given ID was not found');
       return;
   }
   res.send(course);
});

// POST METHODE
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

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