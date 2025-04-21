const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/calculator.html");
});

app.post("/", function (req, res) {
    const firstNumber = parseFloat(req.body.fNumber);
    const secondNumber = parseFloat(req.body.sNumber);
    const operator = req.body.operator;

    // Validate if input values are numbers
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return res.json({ error: "Please enter valid numbers." });
    }

    let calculate;

    switch (operator) {
        case "+":
            calculate = firstNumber + secondNumber;
            break;
        case "-":
            calculate = firstNumber - secondNumber;
            break;
        case "*":
            calculate = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                return res.json({ error: "Division by zero is not allowed." });
            }
            calculate = firstNumber / secondNumber;
            break;
        default:
            return res.json({ error: "Invalid operator. Use +, -, *, or /." });
    }

    res.json({ result: calculate });
});

app.listen(5000, function () {
    console.log("Application Server running on port 5000");
});