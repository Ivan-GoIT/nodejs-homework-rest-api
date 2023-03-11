const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { contactsRoutes } = require("./routes/api/");
require("dotenv").config({ path: "./.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resourse not found..." });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
