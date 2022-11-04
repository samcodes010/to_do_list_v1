const express = require("express")
const bodyPaeser = require("body-parser")

const app = express();

var items = [];
var work_list = [];

app.set ('view engine', 'ejs');

app.use(bodyPaeser.urlencoded({extended: true}));
app.use(express.static("public")) ;
 
app.get ( "/", function(req, res){

    var today = new Date();
    
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long",
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTittle: day, newListItems: items });

}) ;

app.post("/", function (req, res) {
    var item = req.body.newitem;
    
    items.push(item);

    res.redirect("/")
})

app.get( "/work", function(req, res){
res.removeHeader("list", {listTittle: "work list", newListItems: work_list})
});

app.post("/work", function(req, res){
    let item = req.body.work_list;

    items.push(item);

    res.redirect("/work");
});

function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
} 

app.listen(3000, function(){
    console.log("Server started on port");
});
