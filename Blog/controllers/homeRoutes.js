const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Blog.findAll({
            include: [User],
        })

        const blogs = postData.map(blog => blog.get({ plain: true })) // session of object is global to backend
        res.render('homepage', {
            blogs, logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }
    res.render('login')
});

module.exports = router 