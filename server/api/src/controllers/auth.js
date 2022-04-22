/*
 * HTTP response status codes
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

const ErrorResponse = require('../utils/error-response')
const User = require('../models/user')
const send = require('../utils/email')

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body

    try {
        const user = await User.create({
            username, email, password
        })

        // Successful user register - 201 = Created
        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    // Invalid request - 400 = Bad Request
    if (!email || !password)
        return next(new ErrorResponse('Please provide an email and password', 400))

    try {
        const user = await User.findOne({ email }).select('+password')

        // Bad attemps, no match or wrong pw - 401 = Unauthorized
        if (!user)
            return next(new ErrorResponse('Invalid credentials', 401))

        const isMatch = await user.isPassword(password)

        if (!isMatch)
            return next(new ErrorResponse('Invalid credentials', 401))

        // Successful login - 200 = OK
        sendToken(user, 200, res)
    } catch (error) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }
}

exports.forgot = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return next(new ErrorResponse('No email could not be sent', 404));

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = user.getResetToken();

        await user.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:5000/reset/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

        try {
            await send({
                to: user.email,
                subject: 'Password Reset Request',
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            return next(new ErrorResponse('Email could not be sent', 500));
        }
    } catch (error) {
        next(error);
    }
}

exports.reset = async (req, res, next) => {
    const resetToken = req.params.resetToken;

    try {
        const user = await User.findOne({
            resetToken, resetExpire: { $gt: Date.now() }
        })

        if (!user)
            return next(new ErrorResponse('Invalid Reset Token', 400))

        user.password = req.body.password
        user.resetExpire = undefined
        user.resetToken = undefined

        await user.save()

        res.status(201).json({
            success: true.valueOf,
            data: 'Password Reset Success'
        })
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    res.status(statusCode).json({
        success: true,
        token: user.getSignedToken()
    })
}