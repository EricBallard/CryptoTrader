require('dotenv').config({ path: './config/.env' })
const ErrorHandler = require('./middleware/ErrorHandler')

const connect = require('./config/db')
const express = require('express')

connect();

const app = express()
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

app.use(ErrorHandler)

// Handles API request
const server = app.listen(5000, () => {
    console.log('Server running on port 5000')
})

// Gracefully exit on error
process.on('unhandledRejection', (error, promise) => {
    console.log('Logged Error: ' + error.message)
    server.close(() => process.exit(1))
})