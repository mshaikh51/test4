//https://github.com/mshaikh51/test4
//https://important-foal-tam.cyclic.app
var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");

var exphbs = require("express-handlebars");
app.engine('.hbs', exphbs.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {

    console.log("Express http server listening on " + HTTP_PORT);

}



app.get("/", (req, res) => {
        res.render("home");

});



app.get("/BSD", (req, res) => {

    data_prep.bsd().then((data) => {

        res.json(data);

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/CPA", (req, res) => {

    data_prep.cpa().then((mdata) => {
        res.render("students",{data:mdata});

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/highGPA", (req, res) => {

    data_prep.highGPA().then((mdata) => {
res.render("student",{data:mdata});
    });

});



app.get("/allStudents", (req, res) => {

    data_prep.allStudents().then((mdata) => {
        
        res.render("students", {data:mdata},);

    }).catch((reason) => res.json({ message: reason }));

});



app.get("/addStudent", (req, res) => {

    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));

});



app.post("/addStudent", (req, res) => {

    data_prep.addStudent(req.body).then(() => {

        var mdata = req.body;
        res.render("student",{data:mdata});

    }).catch((reason) => res.json({ message: reason }));

});



app.get("/student/:studId", (req, res) => {

    data_prep.getStudent(req.params.studId).then((mdata) => {

        res.render("student",{data:mdata});


        
        }).catch((reason) => res.json({ message: reason }));

});



app.get("*", (req, res) => {

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data) => {

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err) => {

    console.log(err);

});