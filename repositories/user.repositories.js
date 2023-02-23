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
    async addToFavorites(user, prd) {
        return await this.model.findOneAndUpdate(
            {_id: user},
            {$addToSet: {favorites: prd}},
            {new: true},
        ).exec()
    }

    async removeFromFavorites(user, prd) {
        return await this.model.findOneAndUpdate(
            {_id: user},
            {$pull: {favorites: prd}},
            {new: true},
        ).exec()
    }
}

module.exports = UserRepositories;