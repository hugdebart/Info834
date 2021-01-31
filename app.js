const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Import Routes
const postRoute = require('./routes/user');

app.use('/user', postRoute);


//Connecting to MongoDB
mongoose.connect(
    'mongodb://localhost:27017/user',
    {useNewUrlParser: true, useUnifiedTopology : true},
    () => console.log('connected to DB')
)
  
//Middlewares
app.use('/user', () => {
    console.log("Middleware running")
})

//Routes

app.get('/', (req,res) => {
    res.send('AZERTY');
})



//How we start listening to the server
app.listen(3000);