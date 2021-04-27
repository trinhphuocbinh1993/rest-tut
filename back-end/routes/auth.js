const router = require("express").Router();
const Auth = require("../models/Auth");
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const e = require("express");

// NEW WAY WORK WITH JOI TO VALIDATE DATA
router.post('/register', async (req, res) => {
    // check on validate.js
    const { error } = registerValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // checking email is exists on db
    const existsEmail = await Auth.findOne({email: req.body.email})
    if(existsEmail) {
        return res.status(400).send("Email already exists")
    }

    // hash password
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt)

    // if pass, then save into db
    const user = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        date: req.body.date
    });

    try 
    {
        const userSaved = await user.save()
        res.status(200).json(userSaved)
    }
    catch(err) {
        res.status(400).json({ message: err })
    }
})

// LOG IN
router.post('/login', async(req, res) => {
    const {error} = await loginValidation(req);
    if(error) {
        res.status(400).send(error.details[0].message)
    }

    // check email exists
    const emailExists = await Auth.findOne({email: req.body.email})
    if(!emailExists) {
        return res.status(400).send('Email is not found!')
    }

    // check match password
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
    if(!matchPassword) {
        return res.status(400).send('Wrong password!')
    }

    res.status(200).send("Logged in!")
})

module.exports = router;