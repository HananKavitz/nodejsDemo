export {};
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const imagesRouter = require("./serveImagesList");

app.use(express.static("client"));
app.use(express.static("static/outputs"));


app.use(imagesRouter);
app.get("'/", (req:Express.Request, res:any) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
