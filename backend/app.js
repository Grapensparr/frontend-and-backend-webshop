const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const app = express();

app.use(cors());

MongoClient.connect(process.env.MONGODB_URI)
.then(client => {
    console.log("Databasen är ok!");

    const db = client.db("projekt1")
    app.locals.db = db;
})
.catch(err => console.log("err", err))

/* function requireApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: 'Unauthorized. Missing or incorrect API key' });
    } else {
        next();
    }
} */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* app.use(requireApiKey); */
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

module.exports = app;