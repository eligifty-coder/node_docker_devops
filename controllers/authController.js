const User = require('../models/userModel')
const asynWrapper = require('../controllers/asyncWrapper')
const bcrypt = require('bcryptjs')
const asyncWrapper = require('../controllers/asyncWrapper')
exports.signUp = asynWrapper(async (req, res, next) => {
   const { username, password } = req.body
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt)
   console.log(hashPassword, password)
   
   const newUser = await User.create({
      username,
      password:hashPassword
   })
   if (!newUser) {
      res.status(400).json({
         status: 'fail'
      })
   }
   req.session.user = newUser
   res.status(201).json({
      status:'success',
      data: {
         user: newUser
      }
   })
   
})

exports.login = asyncWrapper(async(req, res, next) => {
   const { username, password } = req.body
   const user = await User.findOne({ username })

   const isMatch = await bcrypt.compare(password, user.password)
   if (!user) {
      return res.status(404).json({
         status:'fail',
         message:"user not found"
      })
   } else {
      req.session.user = user
      res.status(200).json({
         status: 'success'
      })

   }
   if (!isMatch) {
      return res.status(400).json({
         status:'fail',
         message:"incorrect username or password"
      })
   }
   // we are attaching user data to the session object
})
// exports.getAllUsers = asynWrapper(async (req, res, next) => {
//    const users = await User.find({})
//    res.status(200).json({
//       status: 'success',
//       data: users
//    })
// })
// exports.deleteUsers = asynWrapper(async (req, res, next) => {
//    const users = await User.findOneAndRemove({_id:req.params.id})
//    res.status(200).json({
//       status: 'success',
//    })
// })