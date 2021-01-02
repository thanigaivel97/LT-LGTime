const express = require('express');
const postController = require('../controllers/postController')
const router = express.Router();
const middleware = require('../middleware/jwt')

router.post('/createPosts', middleware, postController.create);

router.post('/getPosts', middleware, postController.get);

module.exports = router;