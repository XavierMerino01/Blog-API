const { Router } = require('express');
const controller = require('../controllers/commentController.js');
const router = Router();
const passport = require("../config/passportConfig");

router.get('/', (req, res) => {
    res.send('Comment route is working!');
});

router.post('/', passport.authenticate('jwt', {session: false }), controller.createComment);

module.exports = router;