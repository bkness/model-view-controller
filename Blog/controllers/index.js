const router = require('express').Router();

// const apiRoutes = require('./api');
const blogRoutes = require('./homeRoutes');

router.use('/', blogRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
