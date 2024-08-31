const jwt = require('jsonwebtoken')
const { UserToken, User } = require('../models/userModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const MailService = require('./mailService')

class TokenService {
    async generateTokens(user_ip, old_user_ip, email) {
        if (user_ip != old_user_ip) {
            // на локалхосте ip всегда один и проверить работу майлера я не могу, но должно работать
            await MailService.sendChangeIpMail(email)
            const user = await User.findOne({ where: { email: email } })
            await user.update({ user_ip: user_ip })
        }
        const refreshToken = jwt.sign({ user_ip }, process.env.SECRETKEY, { expiresIn: '30d' })
        const accessToken = jwt.sign({ user_ip, refreshToken }, process.env.SECRETKEY, { expiresIn: '30m' })
        const hashedRefreshToken = await this.hashRefreshToken(refreshToken)
        const hashedAccessToken = await this.hashAccessToken(accessToken)
        return {
            hashedAccessToken,
            hashedRefreshToken
        }
    }

    async saveToken(user_id, refreshToken) {
        const time = Math.floor(Date.now() / 1000)
        const tokenData = await UserToken.findOne({ where: { user_id: user_id } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await UserToken.create({ user_id: user_id, refreshToken: refreshToken, created_at: time, updated_at: time })
        return token;
    }

    async hashRefreshToken(refreshToken) {
        const hashedToken = await bcrypt.hash(refreshToken, 3)
        const baseToken = Buffer.from(hashedToken).toString('base64')
        return baseToken;
    }

    async hashAccessToken(accessToken) {
        return crypto.createHash('sha512').update(accessToken).digest('hex');
    }
}

module.exports = new TokenService()