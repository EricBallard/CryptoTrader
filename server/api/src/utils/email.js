const mailer = require('nodemailer')

const send = (options) => {
    const transporter = mailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function (err, info) {
        // TODO - handle email errors?
        console.log(err ? err : info)
    })
}


module.exports = send