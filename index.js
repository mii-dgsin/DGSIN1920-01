var express = require("express");
var path = require('path');
var app = express();
var bp = require('body-parser');
var cors = require('cors');
var request = require('request');
const api_externa = "s://dgsin1920-02.herokuapp.com";

var MongoClient = require('mongodb').MongoClient;
const mdbURL = "mongodb+srv://admin:Jose1973@dgsin1920-01-knvtu.mongodb.net/dgsin-01-db2?retryWrites=true&w=majority"; 
             
var db;
var collectionAPI = require("./collectionAPI");





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
				collectionAPI.register(app, db);

            }
        });
	}
});






app.use("/", express.static(path.join(__dirname, "public")));
app.use("/proxy01", (req, res) => {
    var url_api = api_externa + req.url;
    console.log(req.baseUrl + req.url + " correctamente enrutado");
    req.pipe(request(url_api)).pipe(res);
});
app.use(cors());


app.listen(process.env.PORT || 8080, () => {
    console.log("Servidor listo");
}).on("error", (e) => {
    console.error("Ha ocurrido un problema");
});

/*const BASE_API_PATH = "/api/v1";
// GET a collection for widget visualization 
app.get(BASE_API_PATH + "/data", function (req, res){
	console.log("INFO: New GET request to /data");
 
    res.send([2, 3, 4, 1, 2, 7, 13, 8, 4, 29, 1]);
});*/
