module.exports.saveBook = function (db, title, author, text, callback) {
    db.collection('text').insertOne({
        title: title,
        author: author,
        text: text
    }, callback);
};
module.exports.findBookByTitle = function (db, title, callback) {
    db.collection('text').findOne({
        title: title
    }, function (err, doc) {
        if (err || !doc) callback(null);
        else callback(doc.text);
    });
};

module.exports.findBookByTitleCached = function (db, redis, title, callback) {
    redis.get(title, function (err, reply) {
        console.log(err);
	if (err) callback(null);
        else if (reply) { //Book exists in cache
       console.log('book exists');
        callback(JSON.parse(reply));}
        else {
            //Book doesn't exist in cache - we need to query the main database
            console.log('book doesnt exist');
	    db.collection('text').findOne({
                title: title
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
		console.log('book written in redis');
                    redis.set(title, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};
