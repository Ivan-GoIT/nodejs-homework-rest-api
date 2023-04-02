const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { contactsRoutes, userRoutes } = require("./routes/api");
require("dotenv").config({ path: "./.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/contacts", contactsRoutes);
app.use("/api/users", userRoutes);

app.all("*", (_, res) => {
  res.status(404).json({ message: "Resourse not found..." });
});

module.exports = app.use((err, _, res, __) => {
  res.status(err.status || 500).json({ message: err.message });
});

