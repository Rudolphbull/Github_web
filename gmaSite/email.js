const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // 'STARTTLS'
    auth: {
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD
    }

});

//Function to send email

function sendEmail(name, email, message) {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USERNAME,
        subject: "Email from my website",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


//Example usage
sendEmail('John Doe', 'chigo_272002@yahoo.com', "Hello Rudolph, this is a trust email!!");