const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require('./config/config')
const session = require("express-session")
const redis = require("redis")
const cors  = require('cors')

const app = express()
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')

let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
   host: REDIS_URL,
   port: REDIS_PORT
})

const port = process.env.PORT || 8000
app.enable('trust proxy')
app.use(cors({}))
app.use(session({
   store: new RedisStore({ client: redisClient }),
   secret: SESSION_SECRET,
   cookie: {
      secure: false,
      resave: false,
   }
}))
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)
app.get('/', (req, res) => {
   res.send("<h2>Hi There</h2>")
})

// mongoose.connect("mongodb+srv://gift_girl:eligifty.12345@cluster0.hnzbi.mongodb.net/)6-JOBS_API?retryWrites=true&w=majority")
// mongoose.connect("mongodb://username_from.env:password from .env@ ip-address:mongodbDefaultPort")

// communicating with ip address
// mongoose.connect("mongodb://gift:secret@172.29.0.2:27017/?authSource=admin")

// communicating with container name , because both node and mongo containers are in the same network
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)


const conectWithDBAgain = async () => {
   try {
      await mongoose.connect(MONGO_URL)
      app.listen(port, () => {
         console.log(`listening on ports ${port}`)
      })
   } catch (error) {
      // if mongo does not come up before nodejs, rerun the connection function again <conectWithDBAgain>
      setTimeout(conectWithDBAgain,5000)
   }
}
conectWithDBAgain()

// MONGO_USER


// sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build  ::: this forces a new build when the image changes

// 