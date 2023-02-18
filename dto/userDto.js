module.exports = class UserDto {
    email;
    id;
    role;
    firstName;
    lastName;
    phoneNumber;

    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.firstName = model.firstName;
        this.role = model.role;
        this.lastName = model.lastName;
        this.phoneNumber = model.phoneNumber;
    }
}