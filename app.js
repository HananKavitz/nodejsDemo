const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static("client"));
app.get("'/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
