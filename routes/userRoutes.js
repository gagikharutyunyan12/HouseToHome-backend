const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

/* SIGNUP, SIGNIN, LOGOUT */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', isAuthenticated, UserController.logout);

router.get('/me', isAuthenticated, UserController.getUserDetails)
router.post('/add-favorite', isAuthenticated, UserController.addFavorite);
router.post('/remove-favorite', isAuthenticated, UserController.removeFavorite);

/* ACCOUNT ACTIVATION */
router.get('/activate/:link', UserController.activate);

/* PASSWORD CHANGE COMMANDS */
router.post('/password/forgot', UserController.forgotPassword);
router.put('/password/reset/:token', UserController.resetPassword);
router.put('/password/update', isAuthenticated, UserController.updatePassword);


module.exports = router;