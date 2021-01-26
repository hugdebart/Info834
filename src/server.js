
const express = require('express');
//Accessing MongoDB
const mongoose = require('mongoose');
//Create an application 
const app = express();

//Connecting to MongoDB (async/await approach)
const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(chalk.green(`Connected to database`))
            infoLogger.info("Connected to database");
        },
        error => {
            console.error(chalk.red(`Connection error: ${error.stack}`))
            process.exit(1)
        }
    )
  }
  
  connectDb().catch(error => console.error(error))

  
//Accessing the routes for the user
const todoRoutes = require('./route.js');

//Acces the routes 
app.use('/api/v1/', todoRoutes);

app.get('/', (req, res) => {
    res.send(console.log("Hello World"))
})

app.post('/', (req,res) => {
    res.send()
})

app.listen(3000,  () => {
        console.log(`Example app listening at http://localhost:3000`)
    })