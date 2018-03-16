const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let passes = [];
let id = 0;

let users = [];

app.get('/api/passes', (req, res) => {
    res.send(passes);
});

app.post('/api/passes', (req, res) => {
    id = id + 1;
    let item = { id: id, fName: req.body.fName, lName: req.body.lName, phone: req.body.phone, email: req.body.email, price: req.body.price, availableFrom: req.body.startDate, availableTo: req.body.endDate };
    passes.push(item);
    res.send(item);
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.post('/api/users', (req, res) => {
    let user = { fName: req.body.fName, lName: req.body.lName, phone: req.body.phone, email: req.body.email, password: req.body.password};
    users.push(user);
    console.log(users);
    res.send(user);
})

app.listen(4000, () => console.log('Server listening on port 4000!'))