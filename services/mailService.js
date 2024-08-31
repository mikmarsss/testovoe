const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendChangeIpMail(to) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Вход в аккаунт',
            text: '',
            html:
                `
                <html>
                <body>
                <div>
                    <h1>Зафиксирован вход с другого ip адреса</h1>
                </div>
                </body>
                </html>
                `
        })
    }
}

module.exports = new MailService()