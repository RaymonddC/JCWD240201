const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pharmacy.jcwd2402@gmail.com',
        pass: 'udllnjwxapaqpozm'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
