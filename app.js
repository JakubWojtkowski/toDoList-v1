const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

const port = 3000;

let items = ["Read the book", "Code", "Buy food"];


app.get('/', (req, res) => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const day = today.toLocaleDateString("en-US", options);

    res.render('list', {
        kindOfDay: day,
        newListItems: items
    });

});

app.post('/', (req, res) => {
    const item = req.body.newItem;
    items.push(item);

    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});