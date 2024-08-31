module.exports = class UserDto {
    id;
    user_uuid;
    email;
    password;
    name;
    constructor(model) {
        this.id = model.id
        this.user_uuid = model.user_uuid
        this.email = model.email
        this.password = model.password
        this.name = model.name
    }
}