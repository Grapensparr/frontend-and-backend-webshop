const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    req.app.locals.db.collection('categories').find().toArray()
    .then(result => {
        console.log('Found categories', result);
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
        let newCategory = { name: req.body.name };

        req.app.locals.db.collection('categories').insertOne(newCategory)
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