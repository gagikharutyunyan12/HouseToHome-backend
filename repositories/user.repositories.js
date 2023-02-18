const User = require('../models/userModel');

class UserRepositories {
    constructor() {
        this.model = User
    }

    async checkUser(email) {
        return await this.model.findOne({email}).exec();
    }
    async createUser(email, password, phoneNumber, firstName, lastName, role) {
        return await this.model.create({email, password, phoneNumber, firstName, lastName, role})
    }

    async getById(id) {
        return this.model.findById(id).exec();
    }
    async checkActivationLink(activationLink) {
        return await this.model.findOne({activationLink}).exec()
    }
    async getByResetPasswordToken(resetPasswordToken) {
        return await this.model.findOne({resetPasswordToken, resetPasswordExpires: { $gt: Date.now() }}).exec()
    }
    async getAllUsers() {
        return await this.model.find().exec();
    }
    async deleteUser(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}

module.exports = UserRepositories;