const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

const port = 3000;

// Mongoose part
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


// Home Page

app.get('/', (req, res) => {

    Item.find().then((foundItems) => {

        if (foundItems.length === 0) {

            try {
                Item.insertMany(defaultItems);
                console.log("Succesfully saved default items to DB.");
            } catch (err) {
                console.error("Error meanwhile saving the default items to DB...\n" + err);
            }
            res.redirect('/');

        } else {
            res.render('list', {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
    })

});

app.post('/', (req, res) => {

    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect('/');
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