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
      //res.json(breweries);  
      res.render('homepage', {
        breweries,
        logged_in: true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('')

module.exports = router;