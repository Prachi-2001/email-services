const express = require("express");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/email", emailRoutes);

module.exports = app;
