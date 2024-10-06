const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const { port, db, apiUrl } = require('./configuration')
const { connectDb } = require('./helpers/db')

const app = express();


app.get('/test', (req, res) => {
    res.send('Our authentication server is working correctly');
})

app.get('/currentUser', (req, res) => {
    return res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
})

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        return res.json({
            testapidata: response.data.testapidata
        })
    })
});

app.post('/register', async (req, res) => {
    console.log('Logic to registrate a new user');
    // If the registration is successful, then send an email.
    try {
        // Send POST request to the mailing service : here, the mailer service is included into api service
        const response = await axios.post(apiUrl + '/send-email', {
            to: 'recipient@example.com',
            subject: 'Registration of user successful',
            text: 'User registered successfully!',
        });

        // Send success response
        res.status(200).json({
            message: 'Email sent successfully!',
            response: response.data,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started authentication service on port ${port}`);
        //  console.log(`Our host is ${host}`);
        console.log(`Database url ${db}`);
    })
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)

