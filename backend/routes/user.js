const { Router } = require('express');
const controller = require('../controllers/userController.js');
const passport = require("../config/passportConfig");

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.send(req.user);
}
);

router.post('/login', controller.userLogin);

module.exports = router;