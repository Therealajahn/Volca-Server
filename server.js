//call my packages
const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const cors = require('cors');


//add cors support
app.use(cors({
    origin: 'http://localhost:3000'
}));
//configure app to use body parser to get
// data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

const routes = require('./app/routes');
app.use('/api', routes);


//Start server

app.listen(port,()=>{
    console.log("PORT is LIVE");
})

