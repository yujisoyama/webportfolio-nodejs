/*
var cors = require("cors")
var express = require("express")
var mysql = require("mysql")
var app = express()
app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bc36b55756461d',
    password: '113dd616',
    database: 'heroku_33a541e37e554dd'
})

con.connect((err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database!')
    } 
})

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`On port ${port}`)
    } 
})

app.post('/post',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    con.query('insert into webportfolio_contact values(?,?,?)',[name,email,message],(err,result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(`Saved in database: Name: ${name} - Email: ${email} - Message: ${message}`)
        }
    })
})
*/
const cors = require('cors')
const express = require('express')
const app = express()
const pg = require('pg')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect((err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database!')
    } 
})

app.listen(port,(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`On port ${port}`)
    } 
})

app.get('/', async (req, res) => {
    try {
        const { rows } = await client.query('select * from contact')
        return res.status(200).send(rows)
    } catch (err) {
        return res.status(400).send(err)
    }
})


app.post('/post', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    try {
        const newContact = await client.query(`insert into contact(name, email, message) values ('${name}', '${email}', '${message}')`)
        return res.status(200).send(`Saved in database: Name: ${name} - Email: ${email} - Message: ${message}`)
    } catch (err) {
        return res.status(400).send(err)
    }
})

