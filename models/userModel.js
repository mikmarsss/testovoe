const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const UserToken = sequelize.define('user_token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, },
    updated_at: { type: DataTypes.INTEGER, },
    user_id: { type: DataTypes.UUID },
}, { sequelize, timestamps: false })

const User = sequelize.define('user', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, },
    updated_at: { type: DataTypes.INTEGER, },
    user_ip: { type: DataTypes.STRING },
}, { sequelize, timestamps: false })


User.hasOne(UserToken, { foreignKey: 'user_id' })
UserToken.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
    UserToken,
    User
}