require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("home", {title: "Home - GMA Technologies Ltd"});
});

app.get("/services", (req, res)=>{
    res.render("services", {title: "Our Services - GMA Technologies Ltd"});
});

app.get("/about", (req, res)=>{
    res.render("about", {title: "About Us - GMA Technologies Ltd"});
});

app.get("/contact", (req, res)=>{
    res.render("contact", {title: "Contact Us - GMA Technologies Ltd"});
});

app.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog - Coming Soon" });
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
        res.render("failure", { title: "Failure - GMA Technologies Ltd" });

      } else {
        console.log("Email sent: " + info.response);
        res.render("success", { title: "Success - GMA Technologies Ltd" });

      }
    });
  });


  app.get("/success", (req, res)=>{
    res.render("success", {title: "Success - GMA Technologies Ltd"});
  });

  app.get("/failure", (req, res)=>{
    res.render("failure", {title: "Failure - GMA Technologies Ltd"});
  });


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Gma website App started on port: ", port);
});