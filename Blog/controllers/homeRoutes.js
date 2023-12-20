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

        let blog = blogData.get({ plain: true })
        console.log(blogData)
        res.render('comment', {
            blog,
            logged_in: true,
            session: req.session,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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

        const blogs = postData.map(blog => blog.get({ plain: true }))
        res.render('dashboard', {
            blogs,
            logged_in: req.session.logged_in,
            loginPage: false,
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.get('/post', async (req, res) => {
    res.render('blog-post', {
        logged_in: true,
    });
});

router.delete('/blog/:id', async (req, res) => {
    const blog_id = req.params.id;

    try {
        const deleteBlog = await Blog.findByIdAndDelete(blog_id);

        if (!deleteBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}); 

// renders comment update page 
router.get('/update', async (req, res) => {
    res.render('update', {
        logged_in: true,
    })
})

router.get('/dashboard', withAuth, (req, res) => {
    const userData = req.session.user;

    res.render('dashboard', {
        user: userData,
        logged_in: true,
    });
});

router.get('/update/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        console.log('Retrieved comment data:', comment);
        res.render('update', {
            comment,
            logged_in: true,
        });
       
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }
    res.render('login')
});

module.exports = router 