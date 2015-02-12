var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
//var process = require('process');

var dbu = process.env.MLAB_USERNAME;
var dbp = process.env.MLAB_PW;
if( !dbu || !dbp) {
    var dblogin = fs.readFileSync("prv/dbpw", { "encoding" : "utf-8" } ).split(',');
    var dbu = dblogin[0].trim();
    var dbp = dblogin[1].trim();
}

var dbdomain = 'ds041841.mongolab.com';
var dbport = '41841';
var dburl = 'mongodb://' + dbu + ':' + dbp + '@' + dbdomain + ':' + dbport + '/resume';

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users/:user', function(req, res, next) {

    var user = req.params.user;
    
    mongo.connect(dburl, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.collection('users').findOne({username: user}, function(err, doc) {
        console.log("Found the following records");
        console.log(doc);
        res.send(doc);
        db.close();
        });
    });
});
app.get('/users/:user/jobs', function(req, res, next) {

    var user = req.params.user;
    
    mongo.connect(dburl, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.collection('users').findOne({username: user}, function(err, doc) {
        console.log("Found the following records");
        console.log(doc.jobs);
        db.collection('jobs').find({'_id': { '$in' : doc.jobs }}).toArray(function(err, doc) {
            console.log(err);
            console.log(doc);
            res.send(doc);
            db.close();
        });
        });
    });
});

app.get('/users/:user/education', function(req, res, next) {

    var user = req.params.user;
    
    mongo.connect(dburl, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.collection('users').findOne({username: user}, function(err, doc) {
        console.log("Found the following records");
        console.log(doc.education);
        db.collection('education').find({'_id': { '$in' : doc.education }}).toArray(function(err, doc) {
            console.log(err);
            console.log(doc);
            res.send(doc);
            db.close();
        });
        });
    });
});

app.listen(3000, function() {});
