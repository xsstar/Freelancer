const express = require('express');

const postController = require('../controllers/postController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// CRUD OPS
router.route('/add').post(postController.createPost);
router.route('/update/:id').put(postController.updatePost);
router.route('/delete/:id').delete(postController.deletePost);

module.exports = router;
