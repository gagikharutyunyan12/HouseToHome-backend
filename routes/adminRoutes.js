const { Router } = require('express');
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkRole = require("../middlewares/checkRole");
const AdminController = require("../controllers/admin.controller");

const router = Router();

/* ADMIN COMMANDS USER */
 router.get('/admin/users', isAuthenticated, checkRole("admin"), AdminController.getAllUser);
router.route('/admin/user/:id')
     .get(isAuthenticated, checkRole("admin"), AdminController.getUserById)
     .delete(isAuthenticated, checkRole("admin"), AdminController.deleteUser)
     .put(isAuthenticated, checkRole("admin"), AdminController.updateUserRole);

/* ADMIN COMMANDS PRODUCT */
router.post('/admin/create-prd', isAuthenticated, checkRole("admin"), AdminController.createProduct);
router.put('/admin/add-img/:dirId/:prdId', isAuthenticated, checkRole("admin"), AdminController.updateProduct)

module.exports = router;