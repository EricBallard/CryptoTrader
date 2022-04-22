const ErrorResponse = require('../utils/error-response')

const ErrorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    console.log(err)

    if (err.code === 11000) {
        const message = 'Duplicate Filled Value Enter'
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val => val.message))
        error = new ErrorResponse(mesage, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = ErrorHandler