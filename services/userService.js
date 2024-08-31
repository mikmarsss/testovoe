const UserDto = require('../dtos/userDto')
const TokenDto = require('../dtos/tokenDto')
const { User, UserToken } = require('../models/userModel')
const bcrypt = require('bcrypt')
const TokenService = require('./tokenService')
const uuid = require('uuid')
const MailService = require('./mailService')

class UserService {
    async registration(email, password, user_ip) {
        const time = Math.floor(Date.now() / 1000)
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            throw Error(`Пользователь с а почтовым адресом ${email} уже зарегистрирован!`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ email: email, password: hashPassword, name: 'Плюмбус', created_at: time, updated_at: time, user_ip: user_ip })
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens(user_ip, user.user_ip, email);
        await TokenService.saveToken(user.id, tokens.hashedRefreshToken)
        return { ...tokens, user: userDto }
    }
    //рефреш функция
    async login(email, password, user_ip) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw Error(`Пользователь не найден`)
        }
        const isPassEquals = await bcrypt.compareSync(password, user.password)
        if (!isPassEquals) {
            throw Error(`Неверный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens(user_ip, user.user_ip, email)
        await TokenService.saveToken(user.id, tokens.hashedRefreshToken)
        return { ...tokens, user: userDto }
    }

    async getUserTokens(user_id, accessToken) {
        const userTokens = await UserToken.findOne({ where: { user_id: user_id } })
        const tokensDto = new TokenDto(userTokens)
        return { accessToken, userTokens: tokensDto }
    }
}

module.exports = new UserService()  