const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const { port, host, db, authApiUrl } = require('./configuration')
const { connectDb } = require('./helpers/db')

const app = express()
const kittySchema = new mongoose.Schema({
    name: String
})

// creation of collection 'kittens' inside 'api' database
const Kitten = mongoose.model("Kitten", kittySchema)

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
        console.log(`Our host is ${host}`);
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

