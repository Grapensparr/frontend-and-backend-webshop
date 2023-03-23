const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/', function(req, res, next) {
    req.app.locals.db.collection('products').find().toArray()
    .then(result => {
        console.log('Found products', result);
        res.json(result)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/:productId', function(req, res, next) {
    productId = req.params.productId;
  
    req.app.locals.db.collection('products').findOne({'_id': new ObjectId(productId)})
    .then(result => {
        console.log('Found product', result);
        res.json(result)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/add', function(req, res, next) {
    const token = req.body.token;

    if (!token || token !== process.env.TOKEN) {
        res.status(401).json({ error: 'Not Authorized' });
    } else {
        let newProduct = { name: req.body.name, description: req.body.description, price: req.body.price, lager: req.body.lager };

        req.app.locals.db.collection('products').insertOne(newProduct)
        .then(result => {
            console.log('Result', result);
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    };
});

module.exports = router;