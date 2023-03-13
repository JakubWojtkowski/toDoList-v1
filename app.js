const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems);

const port = 3000;

// Home Page

app.get('/', (req, res) => {

    res.render('list', {
        listTitle: "Today",
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