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
        let newProduct = { name: req.body.name, description: req.body.description, price: req.body.price, lager: req.body.lager, category: req.body.category };

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

router.get('/category/:categoryId', function(req, res, next) {
    const categoryId = req.params.categoryId;

    req.app.locals.db.collection('products').find({ category: categoryId }).toArray()
    .then(result => {
        console.log('Found products for the specified category', result);
        res.json(result);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/updateStock', function(req, res, next) {
    const products = req.body.products;

    products.forEach(product => {
        const productId = product.productId;
        const quantity = product.quantity;
    
        req.app.locals.db.collection('products').updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { lager: -quantity } }
        )
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    });
});

module.exports = router;