module.exports = class TokenDto {
    id;
    refreshToken;
    user_id;
    constructor(model) {
        this.id = model.id
        this.refreshToken = model.refreshToken
        this.user_id = model.user_id
    }
}