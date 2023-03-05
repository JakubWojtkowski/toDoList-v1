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
let workItems = [];

// home page

app.get('/', (req, res) => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const day = today.toLocaleDateString("en-US", options);

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

// Work page

app.get('/work', (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

// about page

app.get('/about', (req, res) => {
    res.render("about");
});

// listening

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});