const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const errorHandler = require("./middlewares/error");
const db = require("./config/db");

const app = express();
dotenv.config(db);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// routes
app.use("/api/application", require("./routes/application"));
app.use("/api/category", require("./routes/category"));
app.use("/api/admin", require("./routes/admin"));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});
