const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('static'));
app.get('/', (req, res, next) => {
    res.sendFile( path.join( __dirname , "./static/index.html"));
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});