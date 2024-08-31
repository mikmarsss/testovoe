const userController = require('../controllers/userController');

const Router = require('express').Router;
const router = new Router()

// Чтобы проще было работать с пользователем я себе функцию сделал для регистрации, 
// если будете проверять, то соответственно тоже можете использовать ее для создания пользователя
router.post('/registration', userController.registration)

// Ну это по сути функция рефреша для acces и refresh токенов, я ее представил как функцию логина, 
router.post('/login', userController.login)

// Тут понятно
router.get('/getUserTokens/:id', userController.getUserTokens)

module.exports = router