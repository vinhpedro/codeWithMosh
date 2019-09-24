const Joi = require('joi');
const express = require('express');
const app = express();

// ADDING MIDDLEWARE
app.use(express.json());

const listOfGenres = [
    {id:1, genre: 'Action'},
    {id:2, genre: 'Adventure'},
    {id:3, genre: 'Comedy'},
    {id:4, genre: 'Crime'},
    {id:5, genre: 'Drama'}
];

// GET METHODE
app.get('/', (req, res) => {
    res.send('Hello from Vidly..!!');
});

// GET ALL GENDRES
app.get('/api/genres', (req, res) => {
    res.send(listOfGenres);
});

// GET SPECIFIEK GENDRE
app.get('/api/genres/:id', (req, res) => {
    //FIND DE ID OF THE LISTOFGENRES
    let genre = listOfGenres.find(obj => obj.id === parseInt(req.params.id));
    // IF THE ID NOT EXIST
    if (genre === undefined) {
        return res.status(404).send('The genre with given ID was not found');
    }
    res.send(genre);
});

// POST METHJODE = CREATE POST
app.post('/api/genres/', (req, res) => {
    // VALIDATE COURSE = VALIDATE WITH JOI
    const {value, error} = validateGenre(req.body);
    // IF ERROR
    if(error) {
        return res.status(400).send(`${error.details[0].message}`);
    }
    // IF NO ERROR CREATE NEW GENRE FROM THE REQ
    const genre = {
        id: listOfGenres.length + 1,
        genre: req.body.genre
    };
    // PUSH THE NEW GENRE TO THE ARRAY LISTOFGENRE
    listOfGenres.push(genre);
    // SEND THE NEW GENRE
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    // FIND THE GENRE ON LISTOFGENRE
    let targetGenre = listOfGenres.find(obj => obj.id === parseInt(req.params.id));
    // IF WE DONT FIND IT GIVE ERROR 404 AND A TEXT MESSEGE
    if(targetGenre === undefined) {
        return res.status(404).send('The genre with given ID was not found');
    }
    // IF WE FIND IT VALIDATE THE INPUT
    let {error, value} = validateGenre(req.body);
    // IF INPUT NOT VALID GIVE THE USER A THE MESSAGE
    if (error) {
        return res.status(400).send(`${error.details[0].message}`);
    }
    // IF VALIOD UPDATE THE SPECIFIEK GENRE ON LISTOFGENRE
    targetGenre.genre = req.body.genre;
    // SEND THE UPDATED GENRE TO THE CLIENT
    res.send(targetGenre);
});

app.delete('/api/genres/:id', (req, res) => {
    // FIND THE GEIVEN ID
    let targetGenre = listOfGenres.find(obj => obj.id === parseInt(req.params.id));
    // IF NOT EXIST GIVE NOT FOUND 404
    if(targetGenre === undefined) {
        return res.status(404).send('Genre with the given ID was not found');
    }
    // IF EXIST DELETE IT
    let findIndex = listOfGenres.findIndex((target) => target.id === targetGenre.id);
    listOfGenres.splice(findIndex , 1);
    // GIVE RESPOND TO THE CLIENT WITCH ONE IS DELETED
    res.send(targetGenre);
});

// VALIDATE REQ.BODY FUNCTION
function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

// PORT
const port = process.env.PORT || 9999;
app.listen(port, () => console.log(`listening on port: ${port}...!`));