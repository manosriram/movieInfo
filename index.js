const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const auth = require("./routes/api/auth");

app.get("/", (req, res) => {
  res.json({ homePage: "Homepage of Index.js" });
});

app.use("/api", auth);

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
