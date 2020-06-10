var express = require("express");
var path = require('path');
var bp = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const mdbURL = "mongodb+srv://admin:Jose1973@dgsin1920-01-knvtu.mongodb.net/dgsin-01-db?retryWrites=true&w=majority";
var app = express();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bp.json());
var db;

MongoClient.connect(mdbURL, (err, client) => {
   
    if (err) {
        console.error("DB connection error: " + err);
        process.exit(1);
    } else {
        db = client.db("dgsin1920-01-db").collection("collection");
        db.find({}).toArray((err, collection) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
            } else if (collection.length == 0) {
                console.info("Adding initial collection to empty DB");
                db.insert(initialCollection);
            } else {
                console.info("Connected to the DB with " + collection.length + " collection");
                var collectionAPI = require("./collectionAPI");
                collectionAPI.register(app, db);
            }
        });
    }
});






app.listen(process.env.PORT || 8080, () => {
    console.log("Server ready");
}).on("error", (e) => {
    console.error("Server NOT ready!");
});