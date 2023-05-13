const express = require('express');
const users = require('./data/userstest');

const app = express();


app.get('/', (req, res) => {
    res.send("API is running..")
});

app.get('/api/users', (req, res) => {
    res.json(users)
});

app.get('/api/users/:id/:id2', (req, res) => {
    const user = users.find((n) => n._id === req.params.id);
    console.log(req.params);
})

app.listen(5000, console.log('server started on port 5000'));