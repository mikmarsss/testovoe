const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.port || 5000
const sequelize = require('./db')
const router = require('./router');
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/api', router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Server started on PORT ${port}`))
    } catch (e) {
        console.log(`Database connect error: ${e}!`)
    }
}

start()