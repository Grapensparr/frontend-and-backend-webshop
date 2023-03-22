const express = require('express');
const router = express.Router();

router.get('/all', function(req, res, next) {
    req.app.locals.db.collection('orders').find().toArray()
    .then(result => {
        console.log('Found orders', result);
        res.json(result)
    })
});

router.post('/add', function(req, res, next) {
    console.log('Request body', req.body);
    let newOrder = { user: req.body.user, products: req.body.products };
  
    req.app.locals.db.collection('orders').insertOne(newOrder)
    .then(result => {
        console.log('Result', result);
        res.json(result);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;