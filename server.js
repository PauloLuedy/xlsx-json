var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var XLSX = require('xlsx');

var app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array());

//static folder
app.use(express.static('public'));


app.get('/', function(req, res) {
    fs.readFile('index.html', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
        //console.log(data);
        res.write(data)
    });
});

app.post("/sendFile",  upload.single('fileName'), function(req, res){

    //text fields
    console.log(req.body);

    //file contents
    console.log(req.file);


    // process
    var response = req.file.originalname;

    var workbook = XLSX.readFile(response);
    var sheet_name_list = workbook.SheetNames;
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    res.json(response);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});