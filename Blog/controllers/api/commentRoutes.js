const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        console.log('Received comment request:', req.body);

        const newComment = await Comment.create({
            user_id: req.session.user_id,
            commentPost: req.body.comment,
            blog_id: req.body.blog_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'Comment was not found' });
            return;
        }
        res.status(200).json({ message: 'Comment was deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
});

module.exports = router;
