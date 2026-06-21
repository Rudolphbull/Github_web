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

app.locals.siteName = "GMA Technologies";
app.locals.tagline = "Your Reliable IT Consultant";

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home.ejs", {pageTitle: "Home"});
});

app.get("/about", function(req, res) {
    res.render("about", {pageTitle: "About"});
});

app.get("/contact", function(req, res) {
    res.render("contact", {pageTitle: "Contact"});
});

app.get("/services", function(req, res) {
    res.render("services", {pageTitle: "Services"});
});

app.get("/invalid", function(req, res){
  res.render("invalid", {pageTitle: "Invalid"});
});

app.get("/successBooking", function(req, res){
  res.render("successBooking", {pageTitle: "successBooking"});
});

app.get("/failureBooking", function(req, res) {
  res.render("failureBooking", {pageTitle: "failureBooking"});
});

app.post("/send", async function(req, res) {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.render("invalid", {pageTitle: "Invalid"});
    }

    try {

        await sendTheEmail({
            name,
            email,
            subject: `New message from ${name} via website`,
            html: `
                <h2>New Contact Message</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>

                <h3>Message</h3>
                <p>${message}</p>
            `
        });

        res.render("success", {pageTitle: "success"});

    } catch(error) {

        console.log(error);

        res.render("failure", {pageTitle: "failure"});
    }
});

app.post("/booking", async function(req, res) {

    const { companyName, email, phone, enquiry, details } = req.body;

    if (!companyName || !email || !phone || !enquiry || !details) {
        return res.render("invalid", {pageTitle: "Invalid"});
    }

    try {

        await sendTheEmail({
            name: companyName,
            email,
            subject: `New consultation request from ${companyName}`,
            html: `
                <h2>New Consultation Request</h2>

                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Enquiry:</strong> ${enquiry}</p>

                <h3>Details</h3>
                <p>${details}</p>
            `
        });

        res.render("successBooking", {pageTitle: "successBooking"});

    } catch(error) {

        console.log(error);

        res.render("failureBooking", {pageTitle: "failureBooking"});
    }
});


app.listen(process.env.PORT || 5000, function() {
    console.log("GMA website App started and running on port", PORT);
});