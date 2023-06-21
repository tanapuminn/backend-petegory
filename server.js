const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.listen(8080, () => {
    console.log('Backend connected...')
})