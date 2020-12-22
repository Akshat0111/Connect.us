const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../keys')
const requireLogin = require('../middlewares/requireLogin')

router.get('/',(req,res) => {
    res.send('Hello')
})

router.post('/signup',(req,res) => {
    const{name,email,pwd} = req.body
    if(!name || !email || !pwd){
        return res.status(422).json({error:"Please add all the fields"})
    }
    
    User.findOne({email : email}).then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with this email"})
        }

        bcrypt.hash(pwd,12).then((hashedpwd) => {
            const user = new User({
                email,
                name,
                pwd : hashedpwd
            })

            user.save().then((user) => {
                res.json({message:"User registered successfully"})
            }).catch((err) => {
                console.log(err)
            })
        })

    }).catch((err) => {
        console.log(err)
    })
})

router.post('/signin',(req,res) => {
    const{email,pwd} = req.body
    if(!email || !pwd){
        return res.status(422).json({error:"Please enter the details"})
    }

    User.findOne({email : email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }

        bcrypt.compare(pwd,savedUser.pwd).then((pwdMatched) => {
            if(pwdMatched){
                //res.json({message:"Successfully Signed In"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email} = savedUser
                res.json({token:token,user:{_id,name,email}})
            }else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        }).catch((err) => {
            console.log(err)
        })
    })
})

module.exports = router