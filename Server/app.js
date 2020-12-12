const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
require('./models/user')
// const customMiddleware = (req,res,next) => {
//     console.log("Custom Middleware executed")
//     next()
// }

// app.use(customMiddleware);

// app.get('/',(req,res) => {
//     res.send('Hello World')
// })

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongo')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting ',err)
})

app.listen(port,()=>{
    console.log('Server is listening at port ' + port)
})