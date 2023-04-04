const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json()).use(morgan("dev")).use(bodyParser.json()).use(cors());
// const sequelize = require("./src/db/sequelize");
//je passe la methode initDb a sequelize
// sequelize.initDb();
const PORT = process.env.PORT || 6000;

require("./src/routes/createUser")(app);
require("./src/routes/emailVerif")(app);

app.listen(PORT, () => console.log(`le port est PORT:${PORT}`));
