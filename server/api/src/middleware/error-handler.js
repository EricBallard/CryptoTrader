const ErrorResponse = require('../utils/error-response')

const ErrorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  console.log(err.message)

  if (err.name === 'ValidationError') {
    // DATABASE ERROR: server is down, invalid credentials, etc
    error = new ErrorResponse(
      Object.values(err.errors).map(val => val.message),
      400
    )
  } else if (err.code === 11000) {
    // DUPLICATE ERROR: user attempted to register with existing email/username
    error = new ErrorResponse(
      error.message.includes('username')
        ? 'Username is taken, please choose another'
        : 'Email is registered, login or reset your password',
      400
    )
  }

  // Return error message/code
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

module.exports = ErrorHandler
