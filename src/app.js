const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode.js");
const forecast = require("./utils/forecast.js");

const app = express();
//paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPaths = path.join(__dirname, "../templates/partials");

//set up handlebar engine and view locations
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPaths);
//set ups static directory to serve
app.use(express.static(publicPath));
//set up options
const dinamicData = {
  title: "Weather ",
  name: "Jesus Flores",
  creator: "Big floppa",
  message: "Es un honor estar con obrador",
};

//render pages
app.get("", function (req, res) {
  dinamicData.title = "index";
  res.render("index", dinamicData);
});
app.get("/about", function (req, res) {
  dinamicData.title = "about";
  res.render("about", dinamicData);
});
app.get("/help", function (req, res) {
  dinamicData.title = "help";
  res.render("help", dinamicData);
});
///////////
app.get("/weather", function (req, res) {
  if (!req.query.address) return res.send({ error });

  geoCode(req.query.address, (err, geoData) => {
    if (err) return console.log(err);

    forecast(geoData, (err, forecastData) => {
      if (err) return console.log(err);
      res.send({
        forecast: forecastData,
        location: geoData.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

//404 pages
app.get("/help/*", function (req, res) {
  dinamicData.title = "help not found";
  res.render("help404", dinamicData);
});

app.get("*", function (req, res) {
  dinamicData.title = "title not found";
  res.render("404page", dinamicData);
});
//start server
app.listen(3000, function () {
  console.log("Server running on port 3000!");
});
