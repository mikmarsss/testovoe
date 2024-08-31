const UserService = require('../services/userService')

class UserController {

    async registration(req, res, next) {
        try {
            const user_ip = req.ip
            const { email, password } = req.body
            const userData = await UserService.registration(email, password, user_ip)
            res.cookie('accessToken', userData.hashedAccessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUserTokens(req, res, next) {
        try {
            const user_id = req.params.id
            // Возможно access токен будет передаваться в заголовке запроса, но фронта у нас нет поэтому берем из куков
            const { accessToken } = req.cookies
            const tokenData = await UserService.getUserTokens(user_id, accessToken)
            return res.json(tokenData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const user_ip = req.ip
            const { email, password } = req.body
            const userData = await UserService.login(email, password, user_ip)
            res.cookie('accessToken', userData.hashedAccessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()