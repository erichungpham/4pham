const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json // set this in postman
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded //set this in postman
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to 4pham application." });
});

//initializing and calling sequelize
const db = require("./app/models");
//db.sequelize.sync();
//use above forreal, use bottom for development
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

require("./app/routes/tutorial.routes")(app);
//require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});