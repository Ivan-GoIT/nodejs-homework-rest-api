const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { contactsRoutes } = require("./routes/api/");
const { checkContactId } = require("./middlewares/contactMiddleware");

const app = express();

const formatsLogger = app.get("tiny") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts/:contactId", checkContactId);
app.use("/api/contacts", contactsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
