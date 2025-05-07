const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('Comment route is working!');
});

module.exports = router;