var express = require('express'),
    app = express(),
    router = express.Router(),
    visitors = require('./visitors');


router.use(visitors({}));
router.use('/admin', require('./adminregister'));
router.use('/admin', require('./signin'));
router.use('/admin', require('./general'));
router.use('/pinup', require('./action'));
// router.use('/admin', require('./sendInvite'));
router.use('/user', require('./userregister'));
router.use('/user', require('./userlogin'));
router.use(require('./recent'));


// router.get('/', function(req, res) {
//     res.send('This is main controller');
// });


module.exports = router;
