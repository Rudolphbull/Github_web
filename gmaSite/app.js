require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

app.get("/elements", function(req, res){
    res.sendFile(__dirname + "/elements.html");
});

app.get("/generic", function(req, res){
    res.render("generic");
});



// Update your server with the POST route
// Add this after your /generic route but before app.listen():

app.post("/send", function (req, res) {
    const { name, email, message } = req.body;

     // Server-side validation: Ensure no fields are empty
     if (!name || !email || !message) {
      return res.render("invalid");
  }
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // or your preferred receiving email
      subject: `New message from ${name} via website`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.render("failure");
      } else {
        console.log("Email sent: " + info.response);
        res.render("success");
      }
    });
  });





app.listen(process.env.PORT || 4000, function(){
    console.log("Gma website server started at port 4000!!!");
});


