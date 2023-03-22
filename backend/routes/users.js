const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');
const { ObjectId } = require('mongodb');

router.get('/', function(req, res, next) {
  req.app.locals.db.collection('users').find().toArray()
  .then(result => {
    console.log('Found users', result);
    res.json(result)
  })
});

router.post('/', function(req, res, next) {
  userId = req.body.id;

  req.app.locals.db.collection('users').findOne({'_id': new ObjectId(userId)})
  .then(result => {
    console.log('Found user', result);

    res.json(result)
  })
});

router.post('/add', function(req, res, next) {
  let newUser = { name: req.body.name, email: req.body.email };
  let passwordToSave = crypto.SHA3(req.body.password).toString();
  newUser.password = passwordToSave;

  req.app.locals.db.collection('users').insertOne(newUser)
  .then(result => {
    console.log('Result', result);
    res.json(result);
  })
});

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  req.app.locals.db.collection('users').findOne({ email })
    .then(foundUser => {
      if(foundUser && crypto.SHA3(password).toString() === foundUser.password) {
        res.status(201).json({name: foundUser.name, id: foundUser._id})
      } else {
        res.status(401).json({ error: 'Incorrect e-mail and/or password' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;