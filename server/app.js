const express = require('express');
const mongoose = require('mongoose');

const config = require('./db');

mongoose.connect(config.DB, {useNewUrlParser: true})
    .then(() => { console.log('Database is connected') },
    err => { console.log('Cannot connect to the database ' + err)}
);


const app = express();

app.get('/', function(req, res){
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});