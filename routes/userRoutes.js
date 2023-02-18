const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const checkRole = require('../middlewares/checkRole')

const router = Router();

/* SIGNUP, SIGNIN, LOGOUT */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

/* ACCOUNT ACTIVATION */
router.get('/activate/:link', UserController.activate);

/* PASSWORD CHANGE COMMANDS */
router.post('/password/forgot', UserController.forgotPassword);
router.put('/password/reset/:token', UserController.resetPassword);
router.put('/password/update', isAuthenticated, UserController.updatePassword);


/* ADMIN COMMANDS */
router.get('/admin/users', isAuthenticated, checkRole("admin"), UserController.getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticated, checkRole("admin"), UserController.getSingleUser)
    .delete(isAuthenticated, checkRole("admin"), UserController.deleteUser)


module.exports = router;