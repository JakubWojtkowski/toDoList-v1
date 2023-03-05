const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    var today = new Date();
});


app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});