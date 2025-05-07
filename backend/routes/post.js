const { Router } = require('express');
const controller = require('../controllers/postController.js');
const router = Router();
const passport = require("../config/passportConfig");

router.get('/', passport.authenticate('jwt', {session: false }), controller.getAllPosts);

router.post('/', passport.authenticate('jwt', {session: false }), controller.createPost);

router.put('/:id/publish', passport.authenticate('jwt', {session: false }), controller.publishPost);

router.put('/:id/unpublish', passport.authenticate('jwt', {session: false }), controller.unpublishPost);

router.post('/:id/delete', passport.authenticate('jwt', {session: false }), controller.deletePost);


module.exports = router;