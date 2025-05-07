const { Router } = require('express');
const controller = require('../controllers/userController.js');
const passport = require("../config/passportConfig");

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }),
function(req, res) {
    const user = req.user;
    res.json({user, isAdmin : user.id === 1});
}
);

router.post('/login', controller.userLogin);

router.post('/register', controller.registerUser);

module.exports = router;