const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

exports.protect = async (req, res, next) => {
    const auth = req.headers.authorization
    let token;

    if (auth && auth.startsWith('DOGETOKEN'))
        token = auth.split(' ')[1]

    if (!token)
        return next(new ErrorResponse('Not authorized to acess this route', 407))

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)


        if (!user)
            return next(new ErrorResponse('Not authorized to acess this route', 401))

        req.user = user
        next()
    } catch (error) {
        return next(new ErrorResponse('Not authorized to acess this route', 404))
    }
}