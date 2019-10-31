var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");


// Initialize Express
var app = express();

//routing controllers
var htmlRouter = require("./controllers/routes.js");
var articleRouter = require("./controllers/newsscrapper.js");

//parser with the app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
var PORT = 3000;
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/news-scraper";

mongoose.connect(MONGODB_URI);

// Show  mongoose errors if any
mongoose.connection.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
