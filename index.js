const express = require("express");
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser");
const app = express();

const auth = require("./routes/api/auth");

app.get("/", (req, res) => {
  res.render("home");
});

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(response.error(err.status || 500));
});

app.use("/api", auth);
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

module.exports = app;
