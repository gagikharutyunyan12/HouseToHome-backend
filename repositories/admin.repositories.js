const User = require('../models/userModel');
const Product = require('../models/productModel')


class AdminRepositories {
    constructor() {
        this.user = User;
        this.product = Product;
    }

    async getById(id) {
        return await this.user.findById(id).exec();
    }

    async allUsers() {
        return await this.user.find().exec();
    }

    async delUser(id) {
        return await this.user.findByIdAndDelete(id).exec();
    }

    async updUserRole(id, role) {
        return await this.user.findByIdAndUpdate(id, role, {new: true, runValidators: true}).exec();
    }

    /* ADMIN PRODUCT COMMANDS */
    async createPrd(data) {
        return await this.product.create({...data});
    }
    async getPrdById(id) {
        return await this.product.findById(id).exec();
    }
    async updatePrd(id, data) {
        return await this.product.findByIdAndUpdate(id, data, {new: true, runValidators: true}).exec();
    }
}

module.exports = AdminRepositories;