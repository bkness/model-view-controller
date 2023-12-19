const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
        await Blog.create({
        user_id: req.session.user_id, 
        title: req.body.title,
        contentPost: req.body.contentPost
      });

      res.status(201).end();
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


module.exports = router;