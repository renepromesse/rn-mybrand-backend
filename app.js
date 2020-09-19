
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4001"
};

app.use(cors(corsOptions));
const mongoose_uri ='mongodb+srv://renepromesse:renepromesse@rene-mybrand-db.2cl0f.gcp.mongodb.net/restAPI?retryWrites=true&w=majority';

const db = require("./app/models");
db.mongoose
  .connect(mongoose_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// a route to the root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application, where you can see all books I read till today." });
});

require("./app/routes/book.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

