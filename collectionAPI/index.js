// Get rid of _id when returning collection
function formatCollection(collection) {
    return collection.map((collection) => {
        delete collection._id // removes the property
        return collection;
    });
}

var initialCollection = [
    {
        "name": "Harvard University",
        "country": "United States of America",
        "teaching_rating": 99.7,
        "industry_income_rating": 34.5,
        "total_score": 96.1,
        "year": 2011

    },
    {
        "name": "California Institute of Technology",
        "country": "United States of America",
        "teaching_rating": 97.7,
        "industry_income_rating": 83.7,
        "total_score": 96,
        "year": 2011

    },
    {
        "name": "Imperial College London",
        "country": "United Kingdom",
        "teaching_rating": 89.2,
        "industry_income_rating": 92.9,
        "total_score": 90.6,
        "year": 2011

    },
    {
        "name": "University of Tokyo",
        "country": "Japan",
        "teaching_rating": 86.1,
        "industry_income_rating": 76.6,
        "total_score": 74.3,
        "year": 2012

    },
    {
        "name": "University of Granada",
        "country": "Spain",
        "teaching_rating": 24.3,
        "industry_income_rating": 29.4,
        "total_score": 72.3,
        "year": 2016

    }
];

module.exports.register = function (app, db) {
    app.get("/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10637735/Szzegfqy");
    });

    // loadInitialData 
    app.get(BASE_API + "/collection/loadInitialData", (req, res) => {
        console.info("New loadInitialData  request to /collection/loadInitialData ");
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
        var newCollection = req.body;
        if (!newCollection) {
            console.warn("New POST request to /collection/ without collection, sending 400...");
            res.sendStatus(400); //bad request
        } else {
            console.info("New POST request to /collection with body: " + JSON.stringify(newCollection, null, 2));
            if (!newCollection.name || !newCollection.country || !newCollection.teaching_rating
                || !newCollection.industry_income_rating || !newCollection.total_score || !newCollection.year
            ) {
                console.warn("The collection " + JSON.stringify(newCollection, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                db.find({ "name": newCollection.name }).toArray((err, collection) => {
                    if (err) {
                        console.error("Error getting data from DB: " + err);
                        res.sendStatus(500);
                    } else {
                        if (collection.length > 0) {
                            console.warn("The collection " + JSON.stringify(newCollection, null, 2) + " already exists, sending 409...");
                            res.sendStatus(409); // conflict
                        } else {
                            console.debug("Adding collection " + JSON.stringify(newCollection, null, 2));
                            db.insert(newCollection);
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
                        var collection = formatCollection(filteredCollection)[0]; //since we expect to have exactly ONE collection with this name
                        console.debug("Sending collection: " + JSON.stringify(collection, null, 2));
                        res.send(collection);
                    } else {
                        console.warn("There are not any collection with name " + name);
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
                        console.debug("The collection with name " + name + " has been succesfully deleted, sending 204...");
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
        var updatedCollection = req.body;
        if (!name) {
            console.warn("New PUT request to /collection/:name without name, sending 400...");
            res.sendStatus(400); // bad request
        } else if (!updatedCollection) {
            console.warn("New PUT request to /collection/ without collection, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New PUT request to /collection/" + name + " with data " + JSON.stringify(updatedCollection, null, 2));
            if (!updatedCollection.name || !updatedCollection.country || !updatedCollection.teaching_rating
                || !updatedCollection.industry_income_rating || !updatedCollection.total_score || !updatedCollection.year) {
                console.warn("The collection " + JSON.stringify(updatedCollection, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            } else {
                db.find({ "name": name }).toArray((err, collection) => {
                    if (err) {
                        console.error('Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    } else {
                        if (collection.length > 0) {
                            db.update({ name: name }, updatedCollection);
                            console.debug("Modifying collection with name " + name + " with data " + JSON.stringify(updatedCollection, null, 2));
                            res.send(updatedCollection); // return the updated collection
                        } else {
                            console.warn("There are not any collection with name " + name);
                            res.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    });
}