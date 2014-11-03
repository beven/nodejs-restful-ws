/**
 * Created by Beven Lee on 2/11/2014.
 */

var express = require("express");
var bodyParser = require("body-parser");
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
app.use(bodyParser.json());

app.get("/people", function (req, res) {
    person.find().select("firstName").limit(10).exec(function (err, doc) {
        console.log("Received request to get people");
        res.send(doc);
    })
});

app.post("/people", function (req, res) {
    person.update({_id: req.body._id}, {firstName: req.body.firstName}, function (err) {
        res.send(req.body)
    })
});

app.get("/people/:id", function(req,res) {
   person.findById(req.params.id, function (err, doc) {
       res.send(doc);
   })
});

app.listen(8888);