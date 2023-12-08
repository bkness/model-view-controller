const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [
          {
            model: User
          },
        ],
        where: {
          user_id: req.session.user_id,
        },
      });
      const blogs = blogData.map((blog) =>
        blog.get({ plain: true })
      );
      //res.json(blogs);  
      res.render('homepage', {
        blogs,
        logged_in: true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  router.post('/blogPost/', withAuth, async (req, res) => {
    console.log('in post');
    console.log(req.body);
  
    try {
      const blogData = await Blog.create({
        title: req.body.title,
        contentPost: req.body.contentPost,
        dateCreated: req.body.dateCreated,

      });
  
      res.status(200).json(blogData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;