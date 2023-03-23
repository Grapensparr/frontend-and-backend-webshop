const express = require('express');
const router = express.Router();

router.get('/all/:token', function(req, res, next) {
    const token = req.params.token;
    console.log(token)

    if (token !== process.env.TOKEN) {
        res.status(401).json({ error: 'Not Authorized' });
    } else {
        req.app.locals.db.collection('orders').find().toArray()
        .then(result => {
            console.log('Found orders', result);
            res.json(result)
        })
    }
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

router.post('/user', function(req, res, next) {
    const token = req.body.token;

    if (!token || token !== process.env.TOKEN) {
        res.status(401).json({ error: 'Not Authorized' });
    } else {
        req.app.locals.db.collection('orders').find({ user: req.body.user }).toArray()
        .then(result => {
            console.log('All orders for user', result);
            res.json(result);
            console.log(result)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }
});

module.exports = router;