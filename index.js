const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const auth = require("./routes/api/auth");

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api", auth);
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
