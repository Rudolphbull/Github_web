const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // 'STARTTLS'
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }

});

//Function to send email

module.exports = sendEmail;

function sendEmail(name, email, message) {
    const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        
        const mailOptions = {
          from: email,
          to: process.env.EMAIL_USERNAME, // or your preferred receiving email
          subject: `New message from ${name} via website`,
          html: 
              `
              <h2>New Contact Message</h2>
    
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email} </p>
    
    
              <h3><strong>Message:</strong> 
              <p>${message} </p> 
              `
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
    }      


