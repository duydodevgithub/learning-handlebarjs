var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res){
  connection.query("SELECT * FROM quotes", function(err, result){
    if(err) throw err;
    res.render("index",{quotes: result});
  });
});
// Express and MySQL code should go here.
app.delete("/:id", function(req,res){
  connection.query("DELETE FROM quotes WHERE id = ?", [req.body.id], function(err, result){
    if(err) throw err;
  })
  res.redirect("/");
})

app.post("/", function(req,res){
  connection.query("INSERT INTO quotes (author, quote) VALUES (?,?)", [req.body.author, req.body.quote], function(err, result){
    if(err) throw err;
  })
  res.redirect("/");
})

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
