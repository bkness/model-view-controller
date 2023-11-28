const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const projectRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
