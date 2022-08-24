const Post = require('../models/postModel')
const asyncWrapper = require('./asyncWrapper')

exports.getAllPosts = asyncWrapper(async (req, res, next) => {
   const posts = await Post.find({})
   console.log(posts)
   
   if (!posts) {
      res.status(400).json({
         status:'fail',
      })
   }
   res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
         posts
      }
   })
})
exports.getOnePost = asyncWrapper(async (req, res, next) => {
   console.log(req.params.id)
   const {id} = req.params
   const post = await Post.findOne({
      _id: id
   })
   console.log("post", post)
   if (!post) {
      res.status(400).json({
         status: 'fail',
      })
   } else {
      res.status(200).json({
         status: 'success',
         data: {
            post,
         }
      })
   }
})


exports.createPost = asyncWrapper(async (req, res, next) => {
   const post = await Post.create(req.body)
   
   res.status(200).json({
      status: 'success',
      data: {
         post
      }
   })
   if (!post) {
      res.status(400).json({
         status:'fail'
      })
   }
})

exports.updatePost = asyncWrapper(async (req, res, next) => {
   const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
   res.status(200).json({
      status: 'success',
      data: {
         post
      }
   })
   if (!post) {
      res.status(400).json({
         status: 'fail'
      })
   }
})
exports.deletePost = asyncWrapper(async (req, res, next) => {
   const post = await Post.findOneAndRemove({ _id: req.params.id })
   res.status(200).json({
      status: 'success',
   })
   if (!post) {
      res.status(400).json({
         status: 'fail'
      })
   }
})
