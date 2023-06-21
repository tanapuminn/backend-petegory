const express = require('express')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    }
))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petegory'
})

con.connect(function (err) {
    if (err) {
        console.log("Error is Connection")
    } else {
        console.log("Connected")
    }
})

app.post('/signup', (req,res) => {
    const sql = 'INSERT INTO users (`name`,`email`,`password`) VALUES (?) ';
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: 'Error in hashing password'})
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: 'Inside singup query' })
            return res.json({ Status: 'Success' })
        })
    })
})

app.listen(8080, () => {
    console.log('Backend connected...')
})