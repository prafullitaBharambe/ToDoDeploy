const express = require('express')
// for logging
const logger = require('morgan')
// middlewear handle the request
const bodyParser = require('body-parser')
const app = express()

const userRoute = require('./app/api/routes/users')


const mongoose = require('mongoose')
//for verifying json web token
const jwt = require('jsonwebtoken')
// setting secret key 
app.set('secretKey','hdjsakfhdjsk')

// function for validation of user credentials
const userValidation = (req, res,next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err
            })
        }
        next()
    })
}

app.use(logger('dev'))
app.use(bodyParser.json())
// importing routes for user and movie 
app.use('/user',userRoute)


// homepage request
app.get('/', (req,res) => {
    res.json({
        "APP": "JWT Based API Application",
        "message": "Successfully Running the Application"
    })
})

const mongoURI = "mongodb+srv://prafullitaPatil:urvee@cluster0.hcla2ac.mongodb.net/?retryWrites=true&w=majority"
//connecting to mongodb
mongoose.connect(mongoURI)
.then(() => {
    console.log("Successfully Connected to the Database")
})
.catch((err) => {
    console.log(err)
})

// 
app.listen(5000,() => {
    console.log("Successfully Running on the PORT: 5000")
})