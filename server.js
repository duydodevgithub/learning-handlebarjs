const express = require("express");
const exphbs = require("express-handlebars");

// create instance of express app
const app = express();
var port = process.env.port || 3001;

//set handlebar as default template engine

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//test data

var newArr = [
    {
        lunch: "Beef"
    },
    {
        breakfast: "egg"
    }
];

// routes

app.get("/", function(req, res){
    res.render("index", newArr[0]);
});

app.listen(port);