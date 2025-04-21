const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/bmiCalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res){
    const bmiWeight = parseFloat(req.body.weight);
    const bmiHeight = parseFloat(req.body.height);

    if (isNaN(bmiWeight) || isNaN(bmiHeight)) {
        res.send("Weight or Height must be a digit!!");
    }
    else {
        const calculateBMI = bmiWeight / (bmiHeight * bmiHeight);

        res.send("Your BMI is: " + calculateBMI);
    }

});

app.get("/", function(req, res){
    res.send("<h1>What is going on here???</h1>")
})

app.listen("4000", function(req, res){
    console.log("Bmi Calculator Server started at port 4000!!!");
});