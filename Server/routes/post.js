const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Post = mongoose.model('Post')


router.get('/allposts',(req,res) => {
    Post.find().populate('postedBy','_id name').then((posts) => {
        res.json({posts})
    }).catch((err) =>{
        console.log(err)
    })
})

router.post('/createPost',requireLogin,(req,res) => {
    const{title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please fill all the fields"})
    }

    req.user.pwd = undefined

    const post = new Post({
        title,
        body,
        postedBy : req.user
    })

    post.save().then((result) => {
        res.json({post : result})
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/myposts',requireLogin,(req,res) => {
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then((posts) =>{
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})
module.exports = router