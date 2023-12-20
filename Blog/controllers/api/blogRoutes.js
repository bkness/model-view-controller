const router = require('express').Router();
const { Blog } = require('../../models');
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const blogData = await Blog.destroy({ 
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });

      if (!blogData) {
          res.status(404).json({ message: 'Blog not found for this user' });
          return;
      }

      res.status(200).json({ message: 'Blog was deleted successfully' });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;