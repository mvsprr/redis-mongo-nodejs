var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    mongoUrl = 'mongodb://localhost:27017/textmonkey';

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var access = require('./access.js');
app.use(express.json());

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw 'Error connecting to database - ' + err;
var dbo = db.db('textmonkey');
    app.post('/book', function (req, res) {
        if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
        else if (!req.body.text) res.status(400).send("Please send some text for the book");
        else {
            access.saveBook(dbo, req.body.title, req.body.author, req.body.text, function (err) {
                if (err) res.status(500).send("Server error");
                else res.status(201).send("Saved");
            });
        }
    });

 app.get('/book/:title', function (req, res) {
    if (!req.params.title) res.status(400).send("Please send a proper title");
    else {
        console.log(req.params.title);
	access.findBookByTitleCached(dbo, redis, req.params.title, function (book) {
	res.status(200).send(book);
        });
    }
});
	app.listen(8000, function () {
        console.log('Listening on port 8000');
    });
});
