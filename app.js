const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('view engine', 'ejs');

const port = 3000;

app.get('/', (req, res) => {
    var today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0) {
        res.send("Yay it's the weekend!");
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});