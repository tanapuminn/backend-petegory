const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const salt = 10;

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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(express.static('public'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

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

app.get('/logout', (req,res) => {
    req.session.destroy();
    return res.json({Status: 'Success'})
})

app.get('/getUsers', (req,res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: 'Get users error in sql' })
        return res.json({ Status: 'Success', Result: result })
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: 'Delete user error in sql' })
        return res.json({ Status: 'Success', Result: result })
    })
})

app.post('/create', (req,res) => {
    const sql = 'INSERT INTO users (`name`,`email`,`password`) VALUES (?) ';
    bcrypt.hash(req.body.password.toString(), salt , (err, hash) => {
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

app.get('/', (req,res) => {
    if(req.session.role) {
        return res.json({valid: true, role: req.session.role})
    } else {
        return res.json({valid: false})
    }
})

app.post('/signup', (req,res) => {
    const sql = 'INSERT INTO users (`name`,`email`,`phone`,`password`) VALUES (?) ';
        const values = [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.password
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: 'Inside singup query' })
            return res.json({ Status: 'Success', result })
        })
})

app.post('/login', (req,res) => {
    const sql = 'SELECT * FROM users where email = ? and password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: 'Error', Error: 'Error in running query'})
        if(result.length > 0) {
            req.session.role = result[0].role;
            return res.json({Login: true})
        } else {
            return res.json({Login: false})
        }
    })
})

app.listen(8080, () => {
    console.log('Backend connected...')
})