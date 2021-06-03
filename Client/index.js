const express = require('express');
const bodyParser = require('body-parser');
const Order = require('./model/order.model');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
var mongoDB = 'mongodb://127.0.0.1/client';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/create-order', async ( req, res, next ) => {
    const order = new Order({
        ...req.body
    });

    const savedItem = await order.save();
    return res.json({ success: true, data: savedItem });
})

app.post('/webhook', async (req, res, next) => {
    const { order_id, order_status } = req.body;
    const order = await Order.findOne({ order_id: order_id })
    order.order_status = order_status;
    await order.save();
    return res.json( {success: true, 'message': 'Order status has been updated'})    
})

mongoose.connect(mongoDB, { useNewUrlParser: true }, function(err) {
    if(!err){
        console.log("Mongo connection succcessfully");
    } else {
        console.log("Something went wrong");
    }
})

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`App is listening at  ${PORT} `)
})