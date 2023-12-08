const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET one blog
router.get('/:id', async (req, res) => {
    console.log("its hitting")
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        console.log('Fetched data:', blog);

        res.render('comment', {
            blog,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




router.post('comment/:id', withAuth, async (req, res) => {
    try {
        const { commentText } = req.body;
        const { id } = req.params;

        const commentData = await Comment.create({
            commentPost: commentText,
            user_id: req.session.user_id,
            blog_id,
        });

        res.statuys(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;