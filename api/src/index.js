const express = require('express')
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')
const axios = require('axios')
const { port, db, authApiUrl } = require('./configuration')
const { connectDb } = require('./helpers/db')

const app = express()
app.use(express.json());

const kittySchema = new mongoose.Schema({
  name: String
})

// creation of collection 'kittens' inside 'api' database
const Kitten = mongoose.model("Kitten", kittySchema)

// Configure nodemailer (using Mailhog SMTP settings)
const transporter = nodemailer.createTransport({
  host: 'mailhog', // This will be the service name in Docker Compose
  port: 1025,
  secure: false, // Mailhog doesn’t use SSL
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'test@example.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent', info });
  });
});

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly');
})

app.get('/testapidata', (req, res) => {
  return res.json({
    testapidata: true
  })
})

app.get('/testwithcurrentuser', (req, res) => {
  axios.get(authApiUrl + '/currentUser').then(response => {
    return res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data
    })
  })
});

const startServer = () => {
  // the port below is the internally exposed port
  // then, this internally exposed port is mapped
  // in docker-compose yml with : 3000:3000 (the first number
  // is the externally exposed port number while the second number is the
  // internal port number, so it must be equal to the one below: 3000 !!!)
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    // console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
    console.log(`Auth api url ${authApiUrl}`);

    const silence = new Kitten({ name: "Silence" });

    // creation of a document (with name 'Silence') inside 'kittens' collection of 'api' database
    silence.save().then(result => console.log('result with volumes', result)).catch(err => console.log(err));
  })
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)

