const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + ("/calculator.html"));
});

app.post("/", function(req, res){
    const firstNumber = parseFloat(req.body.fNumber);
    const secondNumber = parseFloat(req.body.sNumber);
    // const result = res.body.calculate;
    const opera = req.body.operator;


    if (opera == "+"){
        const calculate = (firstNumber + secondNumber);
        res.send("The result is: " + calculate);
    }

    else if (opera == "-"){
        if(firstNumber < secondNumber){
            res.send("first number should be greater than second number.")
        }
        else{
            const calculate = firstNumber - secondNumber;
            res.send("The result is: " + calculate);
        }

    }

    
    else if (opera == "*"){
        const calculate = firstNumber * secondNumber;
        res.send("The result is: " + calculate);
    }

    
    else if (opera == "/"){
        if (firstNumber < secondNumber){
            res.send("first number must be greater than second number.")
        }
        else{
            const calculate = firstNumber / secondNumber;
            res.send("The result is: " + calculate);
        }

    }

    else{
        res.send("Invalid Operator");
    }
    

});

app.get("/contact", function(req, res){
    res.send("Contact me at: rudolphbull@gmail.com");
});

app.listen(5000, function(req, res){
    console.log("Application Server running on port 5000");
});
