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
            blogs, 
            logged_in: req.session.logged_in,
            loginPage: false
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.get('/post', async (req, res) => {
        res.render('blog-post', {
            logged_in: true
        });
    });

// GET one blog
router.get('/blog/:id', async (req, res) => {
    console.log("its hitting")
    try {
        let blogData = await Blog.findByPk(req.params.id, {
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
        
        let blog = blogData.get({ plain:true })
        console.log(blogData)
        res.render('comment', {
            blog,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/comment', withAuth, async (req, res) => {
    try {
        await Comment.create({
            commenPost: req.body.commentPost,
            user_id: req.session.user_id,
            blog_id: req.params.id,
        });

        const comments = commentData.map(comment => comment.get({ plain: true })) 
        res.render('comment', {
            comments, 
            logged_in: req.session.logged_in,
            loginPage: false
        })
        
        res.status(201).end();
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const user_id = req.session.user_id;

        if (!user_id) {
            console.error('User ID not found in session');
            return res.status(401).send('Unauthorized');
        }


        const postData = await Blog.findAll({
            where: { user_id },
            include: [User],
        })

        const blogs = postData.map(blog => blog.get({ plain: true })) // session of object is global to backend
        res.render('dashboard', {
            blogs, 
            logged_in: req.session.logged_in,
            loginPage: false
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.get('/post', async (req, res) => {
        res.render('blog-post', {
            logged_in: true
        });
    });

router.get('/dashboard', withAuth, (req, res) => {
    const userData = req.session.user;

    res.render('dashboard', {
        user: userData,
        logged_in: true
    });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }
    res.render('login')
});

module.exports = router 