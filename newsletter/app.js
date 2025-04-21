const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.userEmail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    
    const url = "https://us10.api.mailchimp.com/3.0/lists/5eff3f017b";
    const options = {
        method: "POST",
        auth: "gma_tutorial:process.env.MAILCHIMP_API_KEY"
    }

    const request = https.request(url, options, function(response){

        let responseData = ""

        response.on("data", function(chunk){
            responseData += chunk;
        });

        response.on("end", function(){
            try{
                const parseData = JSON.parse(responseData);
                console.log("Status Code:", response.statusCode);
                console.log("Mailchimp response:", parseData);

                if (response.statusCode === 200) {
                    const parsed = JSON.parse(responseData);
                    if (parsed.error_count === 0) {
                        res.sendFile(__dirname + "/success.html");
                    } else {
                        console.error("Mailchimp errors:", parsed.errors);
                        res.sendFile(__dirname + "/failure.html");
                    }
                } else {
                    console.error("Non-200 status:", response.statusCode);
                    res.sendFile(__dirname + "/failure.html");
                }
                
            } catch(error){
                console.error("Failed to parse Mailchimp response: ", error);
                console.error("Raw response: ", responseData);
                res.sendFile(__dirname + "/failure.html");
            }
        });

    });

    request.write(jsonData);
    request.end();

    
});

app.listen(process.env.PORT || 4000, function(){
    console.log("Newsletter Signup Server started at port 4000!!!");
});


