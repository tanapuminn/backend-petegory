const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

//connect mongo
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/userRoutes')
const hotelsRoute = require('./routes/hotelsRoutes')
const roomsRoute = require('./routes/roomsRoutes')

dotenv.config()
//mongodb connection
connectDB();

const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
))
// app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.static('public'))
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))

////////////////////////////////

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)


////////////////////////////////

app.listen(8080, () => {
    console.log('Backend connected...')
})