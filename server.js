var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var nodemailer = require('nodemailer')
require('dotenv').config();
var app = express()
app.use(cors())
app.use(bodyParser.json())


// email transporter
var sender = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});


// route to email post request.
app.post('/email', (req, res)=>{
    
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let msg = req.body.msg;

    var mailContent = {
        from: process.env.EMAIL,
        to: 'contact@hopit.in',
        subject: `Hopit support for ${email}`,
        //text: msg
        html: `<div>
                <h4>Name: ${name}</h4></br>
                <h4>Email: ${email}</h4></br>
                <h4>Contact: ${contact}</h4></br>
                <h4>Message: ${msg}</h4>
              </div>`,
       
    }

    sender.sendMail(mailContent, (error)=>{
        if(error){
            console.log(error)
            res.send(error)
        } else {
            res.send('success')
        }
    })
})

app.listen(3210, ()=>{
    console.log('Server Email listning port 3210!')
})


/*

This is for testing 
var mailContent = {
    from: process.env.EMAIL,
    to: 'mohammad.taha39@gmail.com',
    subject: `Hopit support`,
    //text: msg
    html: `<div>
            <h4>Name: ABC</h4></br>
            <h4>Email: abc@gmail.com</h4></br>
            <h4>Contact: 8978787898</h4></br>
            <h4>Message: Test kar raha hu</h4>
          </div>`,
   
}

sender.sendMail(mailContent, (error)=>{
    if(error){
        console.log(error)
        //res.send(error)
    } else {
        res.send('success')
    }
})*/