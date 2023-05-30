const express = require("express");
require("dotenv").config();
require("./src/config/dbConnection");
const taskRoute = require("./src/routes/taskRoute");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api", taskRoute);

app.listen(port, () => {
  console.log(`Server is running ${port} port..`);
});
