// app.js

const nodemailer = require('nodemailer');
console.log(process.env.REFRESH_TOKEN);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USERNAME,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken : process.env.ACCESS_TOKEN,
   
  }
});

  const sendEmail= (emails,username,userEmail)=>{
    const mailConfigurations = {
        from: process.env.EMAIL_USERNAME,
        to: emails,
        subject: `New User ${username} registered`,
        html: `<h2>Hi! There</h2> <h5>  New user  ${username} has registered with email ${userEmail} </h5>`
      }; 
      transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
           console.log('Email Sent Successfully');
        console.log(info);
    });
}
module.exports ={sendEmail}
