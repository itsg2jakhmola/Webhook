const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
var mongoDB = 'mongodb://127.0.0.1/server';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/update-order-status',  ( req, res, next ) => {
    const { order_id, order_status } = req.body; 
     axios.post('http://localhost:3000/webhook', { order_id, order_status })
        .then(() => {
            res.json({ success: 'updated' });
            console.log("success");
        })
        .catch((err) => {
            console.log("Error", err);
        })
})

mongoose.connect(mongoDB, { useNewUrlParser: true }, function(err) {
    if(!err){
        console.log("Mongo connection succcessfully");
    } else {
        console.log("Something went wrong");
    }
})

const PORT = 3001;

app.listen(PORT, function() {
    console.log(`App is listening at  ${PORT} `)
})