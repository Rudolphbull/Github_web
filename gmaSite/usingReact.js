import express from ("express");
import nodemailer from ("nodemailer");

const app = express();

app.post("/send-email", function(req, res){
    const {name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: 'rudolphbull@gmail.com',
            password: "myPassword"
        }
    
    });
    
    //Function to send email
    
    
    const mailOptions = {
        from: email,
        to: 'rudolphbull@getMaxListeners.com',
        subject: "Email from my website",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send({message: "Error sending email"});
        } else {
            res.send({message: "Email sent successfully"});
        }
    });
    
    //Example usage
    sendEmail('John Doe', 'chigo_272002@yahoo.com', "Hello Rudolph, this is a trust email!!");
});


// FRONTEND PART

import React, { useState } from "react";
import axios from "axios";

function EmailForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/send-email', {name, email, message}).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" />
            <button type="submit">Send Email</button>
        </form>
    );
}
