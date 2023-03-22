const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/', function(req, res, next) {
    req.app.locals.db.collection('products').find().toArray()
    .then(result => {
        console.log('Found products', result);
        res.json(result)
    });
});

router.get('/:productId', function(req, res, next) {
    productId = req.params.productId;
  
    req.app.locals.db.collection('products').findOne({'_id': new ObjectId(productId)})
    .then(result => {
        console.log('Found product', result);
        res.json(result)
    });
});

router.post('/add', function(req, res, next) {
    let newProduct = { name: req.body.name, description: req.body.description, price: req.body.price, lager: req.body.lager };

    req.app.locals.db.collection('products').insertOne(newProduct)
    .then(result => {
        console.log('Result', result);
        res.json(result);
    });
});

module.exports = router;