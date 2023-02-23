const Product = require('../models/productModel');

class ProductRepositories {
    constructor() {
        this.model = Product
    }

    async getProductCount() {
        return await this.model.countDocuments().exec();
    }
    async getAllPrd(status, lang) {
        return await this.model.find({$and: [{[`status.${lang}`]: status}, {public: 1}]}).exec();
    }
    async getProductById(id) {
        return await this.model.findById(id).exec();
    }
    async createPrd(data) {
        return await this.model.create({...data});
    }
}

module.exports = ProductRepositories;