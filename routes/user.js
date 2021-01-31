const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req,res) => {
    try{
        const user = await User.find();
        res.json(user);
    }
    catch(err){
        res.json({message : err});
    }
})

router.get('/user1', (req,res) => {
    res.send('AZERTY user number one');
})

router.post('/', async (req,res) => {
    const user = new User({
        name : req.body.name,
        surname : req.body.surname,
        password : req.body.password,
        email : req.body.email
    });
    
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }
    catch(err){
        res.json({message : err});z
    }
});

module.exports = router;