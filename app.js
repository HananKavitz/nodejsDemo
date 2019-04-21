const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
app.get('/', (req, res, next) => {
    res.send('Hanan is great');
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});