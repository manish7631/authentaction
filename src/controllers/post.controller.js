 
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Post = require("../models/post.model")

router.post("", authenticate,   async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const posts = await Post.create(req.body)
        return res.status(200).send(posts)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const posts = await Post.find()
        return res.status(200).send(posts)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.patch("/:id", authenticate,   async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        }).lean().exec()
        return res.status(200).send(posts)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.delete("/:id", authenticate,   async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const posts = await Post.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(posts)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})


module.exports = router;