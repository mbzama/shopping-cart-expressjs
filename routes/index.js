var express = require('express');
var nodemailer = require('nodemailer');
require('dotenv').config();


var router = express.Router();

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  },
  secure: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
  let products = [
    {id:1, category:"phone", name:"samsung", model:"gt100"},
    {id:2, category:"phone", name:"iphone", model:"12"},
    {id:2, category:"tv", name:"mi", model:"4A"}
];
  res.status(200).json(products);
});

router.get('/sendemail', function(req, res, next) {
  let statusMsg = '';

  const mailData = {
    from: 'noreply@evoketechnologies.com',  
      to: 'zamamb@gmail.com',   
      subject: 'AWS Shopping cart app',
      text: 'Sending mail from shoppingcart-api',
      html: '<b>Sending mail from shoppingcart-api</b>'
    };
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        console.log(err);
        res.status(500).json({message: "Could not send message due to error: "+err});
      }       
      else{        
        console.log(statusMsg);
        res.status(200).json({message: "email sent at "+new Date()});
      }        
   });

   
});

module.exports = router;
