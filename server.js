/**
 * Created by Beven Lee on 2/11/2014.
 */

var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

var dbname = "nodejs";
mongoose.connect("mongodb://localhost/" + dbname);

var personSchema = {
    firstName: String,
    lastName: String,
    email: String
};

var person = mongoose.model("Person", personSchema, "people");

var app = express();
app.use(cors());

app.get("/people", function(req, res) {
    person.find(function(err, doc) {
        console.log("Received request to get people");
        res.send(doc);
    })
});

app.listen(8888);