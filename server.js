//require express npm module
const express = require("express");

//require mongoose npm module
const mongoose = require("mongoose");

//give express access to route intructions
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

//express middleware and method for parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//for heroku deploy to use static file
app.use(express.static(__dirname + '/client/build'));

app.use(routes);

//connect to mongo db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/addressbook");

app.listen(PORT, () => {
  console.log(` Server now listening on PORT: ${PORT} `);
});
