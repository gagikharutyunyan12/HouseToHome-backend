const AdminRepositories = require('../repositories/admin.repositories')
const cloudinary = require('cloudinary')
const {NotFound} = require('../exceptions/index')
const {NOT_EXISTS} = require("../utils/constants");
class AdminService extends AdminRepositories {
    constructor() {
        super();
    }

    async getAllUsers() {
        const users = await this.allUsers();
        return users;
    }

    async getUserById(id) {
        const user = await this.getById(id);
        return user
    }

    async deleteUser(id) {
        const candidate = await this.delUser(id);
        return candidate
    }
    async updateUserRole(id, role) {
        const updatedUser = await this.updUserRole(id, role);
        return updatedUser
    }
    /* ADMIN PRODUCT COMMANDS */
    async createProduct(data) {
        let images = []
        if(typeof data.images === "string") {
            images.push(data.images)
        } else {
            images = data.images
        }

        const imagesLink = []

        for(let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        data.images = images
        const newProduct = await this.createPrd(data);
        return newProduct;
    }

    async updateProduct(id, data) {
        let product = await this.getPrdById(id);

        if(!product) {
            throw new NotFound(NOT_EXISTS('id'));
        }

        if(data.images !== undefined) {
            let images = [];
            if(typeof data.images === "string") {
                images.push(data.images)
            } else {
                images = data.images;
            }
            for(let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLink = [];

            for(let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products"
                });

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
            data.images = imagesLink
        }

        product = await this.updatePrd(id, data);
        return product

    }
}

module.exports = new AdminService()