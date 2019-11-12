export {};
const express = require("express");
const os = require('os');
const path = require("path");
const port = process.env.PORT || 8080;
// const morgan = require("morgan");
const cors = require('cors');
const formData  =  require('express-form-data');
const app = express();
const imagesRouter = require("./serveImagesList");
import { Response, Request } from "express";


// app.use(morgan('dev'));

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
app.use(cors());
app.use(formData.parse(options));
app.use(formData.union());
app.use(express.static("client"));
app.use(express.static("static/outputs"));


app.use('/api',imagesRouter);
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
