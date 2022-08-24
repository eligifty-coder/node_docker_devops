const express = require('express')
const postControllers = require('../controllers/PostController')
const router = express.Router()
const protectUser = require('../middlewares/authMiddleware')


router.route('/')
   .get(protectUser, postControllers.getAllPosts)
   .post(protectUser, postControllers.createPost)

router.route('/:id').get(protectUser,postControllers.getOnePost)
   .patch(protectUser,postControllers.updatePost)
   .delete(protectUser,postControllers.deletePost)

module.exports = router