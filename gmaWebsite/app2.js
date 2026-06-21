require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

//creating a local module to send email
const sendTheEmail = require(path.join(__dirname, "/email.js")); 


// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASSWORD;

const PORT = 5000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/services", function(req, res) {
    res.render("services");
});

app.get("/invalid", function(req, res){
  res.render("invalid");
});

app.get("/successBooking", function(req, res){
  res.render("successBooking");
});

app.get("/failureBooking", function(req, res) {
  res.render("failureBooking");
});

app.post("/send", function (req, res) {
    const { name, email, message } = req.body;

     // Server-side validation: Ensure no fields are empty
     if (!name || !email || !message) {
      return res.render("invalid");
    }

    sendTheEmail(name, email, message);

    res.render("success");
  
    });


app.post("/booking", function(req, res) {

  const {companyName, email, phone, enquiry, details} = req.body;

  //Server-side validation: ensure no fields are blank
  if (!companyName || !email || !phone || !enquiry || !details) {
    return res.render("invalid");
  }
    
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USERNAME, //or your preferred recipient's email
    subject: `New consultation message from ${companyName} new website!!!`,
    html: 
      `
        <h2>New Consultation Request</h2>

        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry Type:</strong> ${enquiry}</p>

        <h3>Details</h3>
        <p>${details}</p>
      `
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log("Sorry unable to send due to ", error);
      res.render("failureBooking");
    } else {
      console.log("Email Sent", info.response);
      res.render("successBooking");
    }
  });

});



app.listen(process.env.PORT || 5000, function() {
    console.log("GMA website App started and running on port", PORT);
});