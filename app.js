const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.set('strictQuery', true);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

const port = 3000;

// Mongoose part
mongoose.connect("mongodb+srv://wojtko:wojtkomongodb1234@cluster0.jmqpauu.mongodb.net/todolistDB");
// mongoose.connect("mongodb://localhost:27017/todolistDB");

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

const customListSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", customListSchema);

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

// Custom list name

app.get('/:customListName', (req, res) => {

    const customListName = _.capitalize(req.params.customListName);

    List.findOne({
        name: customListName
    }, (err, foundList) => {
        if (!err) {
            if (!foundList) {

                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect(`/${customListName}`);
            } else {
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }
        }
    });
});

app.post('/', (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({
            name: listName
        }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect(`/${listName}`);
        });
    }

});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (!err) {
                console.log("Succesfully deleted checked item");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({
            name: listName
        }, {
            $pull: {
                items: {
                    _id: checkedItemId
                }
            }
        }, (err, foundList) => {
            if (!err) {
                res.redirect(`/${listName}`);
            }
        });
    }
});

// About Page

app.get('/about', (req, res) => {
    res.render("about");
});

// Listening

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});