const router = require('express').Router();
const verify = require('./verifyToken');
const Posts = require('../model/Posts');
const { postValidation } = require('../validation')

// middlerware
router.use(verify)

router.route('/')
    .get((req, res) => {
        // find all the posts which were posted by logged in user
        // could access req.user which is the property that the middleware function adds to req (the request object)
        Posts.find({ uid: req.user._id }, (err, userPosts) => {
            if (err) return res.sendStatus(400)
            return res.json(userPosts)
        })
    })
    .post((req, res) => {
        // Validate the data
        const { error } = postValidation(req.body);
        if (error) return res.json({ msg: error.details[0].message });
        // creat post
        Posts.create({ uid: req.user._id, ...req.body }, (err, post) => {
            if (err) return res.sendStatus(400)
            res.json(post)
        })
    })

router.route('/:postId')
    .get((req, res) => {
        Posts.findOne({ _id: req.params.postId }, (err, userPost) => {
            if (err) return res.sendStatus(400)
             return res.json(userPost)
            
        })
    })
    .delete((req, res) => {
        Posts.deleteOne({ _id: req.params.postId }, (err) => {
            if (err) return res.sendStatus(400)
            res.status(200).json({ msg: `${req.params.postId} was deleted successfully` })
        })
    })
    .patch((req, res) => {
        Posts.updateOne({ _id: req.params.postId }, { $set: req.body },(err) => {
            if (err) return res.sendStatus(400)
            res.status(200).json({msg: `${req.params.postId} was updated successfully`})
        })
    })

module.exports = router;