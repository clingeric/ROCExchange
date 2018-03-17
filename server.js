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
let userId = 0;

let currentUser = '';

// Returns a list of available ROC passes
app.get('/api/passes', (req, res) => {
    res.send(passes);
});

// Adds a ROC pass
app.post('/api/passes', (req, res) => {
    id = id + 1;
    let item = { id: id, fName: req.body.fName, lName: req.body.lName, phone: req.body.phone, email: req.body.email, price: req.body.price, availableFrom: req.body.availableFrom, availableTo: req.body.availableTo };
    passes.push(item);
    res.send(item);
});

// Removes the user's posted pass(es)
app.delete('/api/passes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = passes.map(pass => { return pass.id; }).indexOf(id);
    if (removeIndex === -1) {
        res.status(404).send("Sorry, an error occured. Please try again");
        return;
    }
    passes.splice(removeIndex, 1);
    res.sendStatus(200);
})

// Returns all signed up users
app.get('/api/users', (req, res) => {
    res.send(users);
});

// Creates new user
app.post('/api/users', (req, res) => {
    userId = userId + 1;
    let user = { userId: userId, fName: req.body.fName, lName: req.body.lName, phone: req.body.phone, email: req.body.email, password: req.body.password };
    users.push(user);
    res.send(user);
})

// Edits user details
app.put('/api/users/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let usersMap = users.map(user => { return user.userId; });
    let index = usersMap.indexOf(id);
    let user = users[index];
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    res.send(user);
})

// Returns the current, logged in user
app.get('/api/user', (req, res) => {
    res.send(currentUser);
})

// Sets the current user to the user who just logged in
app.post('/api/user', (req, res) => {
    let user = { userId: req.body.userId, fName: req.body.fName, lName: req.body.lName, email: req.body.email, phone: req.body.phone };
    currentUser = user;
    res.send(user);
})

// Clears the current user (essentially logs out the user)
app.delete('/api/user', (req, res) => {
    currentUser = '';
})


app.listen(4000, () => console.log('Server listening on port 4000!'))