var mysql = require('mysql');
var app = require("express")();


const dbCon = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6436860",
    password: "KGZMVn7E5A",
    database: "sql6436860"
});

//Create a table
app.get("/create", (req, res) => {
    var sql = "CREATE TABLE students (sno INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), course VARCHAR(255))";
    dbCon.query(sql, function (err, result) {
        if (err) res.end(err.sqlMessage);
        res.status(200).send("Students Table created succesfully");
    });
})

//Add a student from single api
app.get("/addstudent", (req, res) => {
    var sql = "INSERT INTO students (name, phone, email, course) VALUES ('" + req.query.name + "','" + req.query.phone + "','" + req.query.email + "','" + req.query.course + "')";
    dbCon.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//Shows students table
app.get("/show", (req, res) => {
    var sql = "SELECT * FROM students";
    dbCon.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//Utility functions
app.get("/utils", (req, res) => {
    let sql = "DROP TABLE students";
    dbCon.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//Server connection
app.listen(8000, () => {
    //DB connection
    dbCon.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log("Music on...");
});