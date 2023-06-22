const express = require('express')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
// app.use(cors(
//     {
//         origin: ['http://localhost:3000'],
//         methods: ['POST', 'GET', 'PUT', 'DELETE'],
//         credentials: true
//     }
// ))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
// app.use(express.static('public'))



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

app.post('/login', (req,res) => {
    const sql = 'SELECT * FROM users WHERE email = ? ';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: 'Error', Error: 'Error in running query'})
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: "password error" });
            })
            return res.json({Status: 'Success'})
        } else {
            return res.json({Status: 'Error', Error: 'Wrong Email or Password!!'})
        }
    })
})

app.listen(8080, () => {
    console.log('Backend connected...')
})