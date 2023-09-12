const express = require("express");
const bodypa = require("body-parser");

const app = express();
app.use(bodypa.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var items = [];
var workitems = [];
var homeitems = [];

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }
    var day = today.toLocaleDateString("en-us", options);
    res.render("index", {
        curdate: day,
        newitems: items
    })
})
app.post("/", function (req, res) {
    var item = req.body.inp;
    var ty = req.body.btn;
    console.log(ty);
    if (req.body.btn === "Work") {
        workitems.push(item);
        res.redirect("/work");
    }
    else if (req.body.btn === "Home") {
        homeitems.push(item);
        res.redirect("/Homework")
    }
    else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function (req, res) {
    res.render("index", {
        curdate: "Work List",
        newitems: workitems
    })
})

app.get("/Homework", function (req, res) {
    res.render("index", {
        curdate: "Home Work",
        newitems: homeitems
    })
})

app.listen(3000);