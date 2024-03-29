
var bp = require("body-parser");

// Get rid of _id when returning collection
function formatCollection(collection) {
    return collection.map((collection) => {
        delete collection._id // removes the property
        return collection;
    });
}

const BASE_API = "/api/v1";


module.exports.register = function (app, db) {

    // loadInitialData 
    app.use(bp.json());

    app.get(BASE_API + "/collection/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10637735/Szzegfqy");

    });

    app.get(BASE_API + "/collection/loadInitialData", (req, res) => {

        db.find({}).toArray((err, collection) => {
            if (collection.length == 0) {
                console.info("Empty database, adding initial values");
                var jsondb = require("../bd/bd.json");
                for (var i = 0; i < jsondb.length; i++) {

                    var name = jsondb[i].name;
                    var country = jsondb[i].country;
                    var teaching_rating = jsondb[i].teaching_rating;
                    var industry_income_rating = jsondb[i].industry_income_rating;
                    var total_score = jsondb[i].total_score;
                    var year = jsondb[i].year;

                    var campos = {
                        "name": name,
                        "country": country,
                        "teaching_rating": teaching_rating,
                        "industry_income_rating": industry_income_rating,
                        "total_score": total_score,
                        "year": year,

                    }

                    db.insert(campos);
                }
                console.log("Insertion finished");
                res.sendStatus(201);
            }
            else {
                console.warn("Database not empty, nothing is done");
                res.sendStatus(409);
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

                console.warn("The collection " + JSON.stringify(newCollection, null, 2) + " is not well-formed, sending 400..." + newCollection);
                res.sendStatus(400); // unprocessable entity
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
        console.warn("New PUT request to /collection, operation not allowed, sending 405...");
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
                        var collection = formatCollection(filteredCollection); //since we expect to have exactly ONE collection with this name
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

    // GET a specific country
    app.get(BASE_API + "/collection/country/:country", (req, res) => {
        var country = req.params.country;
        if (!country) {
            console.warn("New GET request to /collection/:country without country, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New GET request to /collection/" + country);
            db.find({ "country": country }).toArray((err, filteredCollection) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    if (filteredCollection.length > 0) {
                        var collection = formatCollection(filteredCollection); //since we expect to have exactly ONE collection with this name
                        console.debug("Sending collection: " + JSON.stringify(collection, null, 2));
                        res.send(collection);
                    } else {
                        console.warn("There are not any collection with country " + country);
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
        } else if (name != req.body.name) {
            console.warn("The id of the URL is different from the body");
            res.sendStatus(400);

        } else if (!updatedCollection) {
            console.warn("New PUT request to /collection/ without collection, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New PUT request to /collection/" + name + " with data " + JSON.stringify(updatedCollection, null, 2));
            if (!updatedCollection.name || !updatedCollection.country || !updatedCollection.teaching_rating
                || !updatedCollection.industry_income_rating || !updatedCollection.total_score || !updatedCollection.year) {
                console.warn("The collection " + JSON.stringify(updatedCollection, null, 2) + " is not well-formed, sending 422...");
                res.sendStatus(400); // unprocessable entity
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
