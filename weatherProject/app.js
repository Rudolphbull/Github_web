const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "80bcfb3e3b6a7bf7f83c1171efef4847";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q= "+ query +"&appid="+ apiKey +"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        // const temp = weatherData.main.temp;
        const weatherDataDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<h1>The Temperature in " + query + "</h1>");
        res.write("<p>The weather is currently " + weatherDataDescription + "</p>");
        res.write("<img src=" + imageUrl +">");
        res.send();

        });
    });
});




app.listen(3000, function(){
    console.log("Weather App Server started on port 3000!!!");
});


