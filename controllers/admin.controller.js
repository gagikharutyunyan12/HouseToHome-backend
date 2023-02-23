const adminService = require("../services/admin.service");
const { SUCCESS_CODE, CREATED_CODE} = require('../exceptions/status-code')
class AdminController {
    async getAllUser(req, res, next) {
        try {
            const users = await adminService.getAllUsers();

            res.status(SUCCESS_CODE).json(users)
        } catch(e) {
            next(e);
        }
    }
    async getUserById(req, res, next) {
        try {
            const user = await adminService.getUserById(req.params.id)

            res.status(SUCCESS_CODE).json(user)
        } catch (e) {
            next(e)
        }
    }
    async deleteUser(req, res, next) {
        try {
          await adminService.deleteUser(req.params.id);

          res.status(SUCCESS_CODE);
        } catch (e) {
            next(e)
        }
    }
    async updateUserRole(req, res, next) {
        try {
            const updatedUser = await adminService.updateUserRole(req.params.id, req.body.role);

            res.status(SUCCESS_CODE).json(updatedUser)
        } catch (e) {
            next(e)
        }
    }

    /* ADMIN PRODUCT COMMANDS */
    async createProduct(req, res, next) {
        try {
            const newProduct = await adminService.createProduct(req.body)
            return res.status(CREATED_CODE).json(newProduct)
        } catch (e) {
            next(e)
        }
    }
    async updateProduct(req, res, next) {
        try {
            const updatedProduct = await adminService.updateProduct(req.params.id, req.body);
            return res.status(SUCCESS_CODE).json(updatedProduct);
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AdminController();