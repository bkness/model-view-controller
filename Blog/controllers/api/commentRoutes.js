const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/api/comment', async (req, res) => {
    try {
        
       const newComment = await Comment.create({
        user_id: req.session.user_id, 
        commentPost: req.body.comment,
        blog_id: req.body.blog_id,
    })
   
    res.status(200).json(newComment);
} catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
} 
});

module.exports = router;