const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

const port = 3000;

app.get('/', (req, res) => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const day = today.toLocaleDateString("en-US", options);

    res.render('list', {
        kindOfDay: day
    });

});

app.post('/', (req, res) => {
    const task = req.body.item;
    const li = document.createElement('li');
    li.innerHTML = task;
    document.querySelector('.list').appendChild(li);
});


app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});