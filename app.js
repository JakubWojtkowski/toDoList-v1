const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const port = 3000;

// const items = ["Read the book", "Code", "Buy food"];
// const workItems = [];

// Home Page

app.get('/', (req, res) => {

    const day = date.getDate();

    res.render('list', {
        listTitle: day,
        newListItems: items
    });

});

app.post('/', (req, res) => {

    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

});

// Work Page

app.get('/work', (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

// About Page

app.get('/about', (req, res) => {
    res.render("about");
});

// Listening

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});