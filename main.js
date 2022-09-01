var cors = require("cors")
var express = require("express")
var mysql = require("mysql")
var app = express()
app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'myprojects'
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