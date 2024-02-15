const express = require('express');
const { urlencoded } = require('express');
const dotenv = require('dotenv').config()
// const colors = require('colors')
const PORT = process.env.PORT || 3000
const {errorhandler} = require('./middlewares/errorMid')
const connectDB = require('./config/db')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use ('/api/goals', require('./routes/goalRoutes.js'))

app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 