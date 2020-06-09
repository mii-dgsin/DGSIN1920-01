var express = require("express");
var path = require('path');
var bp = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const BASE_API = "/api/v1";
const mdbURL = "mongodb+srv://admin:Jose1973@dgsin1920-01-knvtu.mongodb.net/dgsin-01-db?retryWrites=true&w=majority";
               

var app = express();

//app.get("/docs", (req, res) => {
  //  res.redirect("https://documenter.getpostman.com/view/5455766/S11NMcFj");
//});

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bp.json());

var initialCollection = [
    {
        "name": "John",
        "email": "john.doe@example.com",
        "phone": 954123456
    },
    {
        "name": "Jane",
        "email": "jane.doe@example.com",
        "phone": 954654321
    },
    {
        "name": "Foo",
        "email": "foo@example.com",
        "phone": 616616616
    },
    {
        "name": "Bar",
        "email": "bar@example.com",
        "phone": 789321456
    }
];

var db;

MongoClient.connect(mdbURL, (err, client) => {
    if (err) {
        console.error("DB connection error: " + err);
        process.exit(1);
    } else {
        db = client.db("dgsin-xx-db").collection("collection");
        db.find({}).toArray((err, collection) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
            } else if (collection.length == 0) {
                console.info("Adding initial collection to empty DB");
                db.insert(initialCollection);
            } else {
                console.info("Connected to the DB with " + collection.length + " collection");
            }
        });
    }
});

// Get rid of _id when returning collection
function formatCollection (collection) {
    return collection.map((contact) => {
        delete contact._id // removes the property
        return contact;
    });
}


// GET a collection
app.get(BASE_API + "/collection", (req, res) => {
    console.info("New GET request to /collection");
    db.find({}).toArray((err, collection) => {
        if (err) {
            console.error("Error getting data from DB: " + err);
            res.sendStatus(500);
        } else {
            var formattedCollection = formatCollection(collection);
            console.debug("Sending collection: " + JSON.stringify(formattedCollection, null, 2));
            res.send(formattedCollection);
        }
    });
});

// POST over a collection
app.post(BASE_API + "/collection", (req, res) => {
    var newContact = req.body;
    if (!newContact) {
        console.warn("New POST request to /collection/ without contact, sending 400...");
        res.sendStatus(400); //bad request
    } else {
        console.info("New POST request to /collection with body: " + JSON.stringify(newContact, null, 2));
        if (!newContact.name || !newContact.email || !newContact.phone) {
            console.warn("The contact " + JSON.stringify(newContact, null, 2) + " is not well-formed, sending 422...");
            res.sendStatus(422); // unprocessable entity
        } else {
            db.find({ "name": newContact.name }).toArray((err, collection) => {
                if (err) {
                    console.error("Error getting data from DB: " + err);
                    res.sendStatus(500);
                } else {
                    if (collection.length > 0) {
                        console.warn("The contact " + JSON.stringify(newContact, null, 2) + " already exists, sending 409...");
                        res.sendStatus(409); // conflict
                    } else {
                        console.debug("Adding contact " + JSON.stringify(newContact, null, 2));
                        db.insert(newContact);
                        res.sendStatus(201); // created
                    }
                }
            });
        }
    }
});

// DELETE over a collection
app.delete(BASE_API + "/collection", (req, res) => {
    console.info("New DELETE request to /collection");
    db.remove({}, { multi: true }, (err, result) => {
        if (err) {
            console.error('Error removing data from DB');
            res.sendStatus(500); // internal server error
        } else {
            var numRemoved = result.result.n;
            if (numRemoved === 0) {
                console.warn("There are no collection to delete");
                res.sendStatus(404); // not found
            } else {
                console.debug("All the collection (" + numRemoved + ") have been succesfully deleted, sending 204...");
                res.sendStatus(204); // no content
            }
        }
    });
});

// PUT over a collection
app.put(BASE_API + "/collection", (req, res) => {
    console.warn("New PUT request to /collection, sending 405...");
    res.sendStatus(405); // method not allowed
});

// GET a specific resource
app.get(BASE_API + "/collection/:name", (req, res) => {
    var name = req.params.name;
    if (!name) {
        console.warn("New GET request to /collection/:name without name, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New GET request to /collection/" + name);
        db.find({ "name": name }).toArray((err, filteredCollection) => {
            if (err) {
                console.error('Error getting data from DB');
                res.sendStatus(500); // internal server error
            } else {
                if (filteredCollection.length > 0) {
                    var contact = formatCollection(filteredCollection)[0]; //since we expect to have exactly ONE contact with this name
                    console.debug("Sending contact: " + JSON.stringify(contact, null, 2));
                    res.send(contact);
                } else {
                    console.warn("There are not any contact with name " + name);
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});

// POST a specific resource
app.post(BASE_API + "/collection/:name", (req, res) => {
    var name = req.params.name;
    console.warn("New POST request to /collection/" + name + ", sending 405...");
    res.sendStatus(405); // method not allowed
});

// DELETE a specific resource
app.delete(BASE_API + "/collection/:name", (req, res) => {
    var name = req.params.name;
    if (!name) {
        console.warn("New DELETE request to /collection/:name without name, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New DELETE request to /collection/" + name);
        db.remove({ name: name }, {}, function (err, result) {
            if (err) {
                console.error('Error removing data from DB');
                res.sendStatus(500); // internal server error
            } else {
                var numRemoved = result.result.n;
                console.debug("Collection removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.debug("The contact with name " + name + " has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                } else {
                    console.warn("There are no collection to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});

// PUT over a specific resource
app.put(BASE_API + "/collection/:name", (req, res) => {
    var name = req.params.name;
    var updatedContact = req.body;
    if (!name) {
        console.warn("New PUT request to /collection/:name without name, sending 400...");
        res.sendStatus(400); // bad request
    } else if (!updatedContact) {
        console.warn("New PUT request to /collection/ without contact, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New PUT request to /collection/" + name + " with data " + JSON.stringify(updatedContact, null, 2));
        if (!updatedContact.name || !updatedContact.phone || !updatedContact.email) {
            console.warn("The contact " + JSON.stringify(updatedContact, null, 2) + " is not well-formed, sending 422...");
            res.sendStatus(422); // unprocessable entity
        } else {
            db.find({ "name": name }).toArray((err, collection) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    if (collection.length > 0) {
                        db.update({ name: name }, updatedContact);
                        console.debug("Modifying contact with name " + name + " with data " + JSON.stringify(updatedContact, null, 2));
                        res.send(updatedContact); // return the updated contact
                    } else {
                        console.warn("There are not any contact with name " + name);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server ready");
}).on("error", (e) => {
    console.error("Server NOT ready!");
});