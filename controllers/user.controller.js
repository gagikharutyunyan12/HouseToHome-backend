const userService = require('../services/user.service');

class UserController {
    async register(req, res, next) {
        try {
            const {email, password, phoneNumber, firstName, lastName, role} = req.body;
            const userData = await userService.register(email, password, phoneNumber, firstName, lastName, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.id;
            await userService.activate(activationLink);
            return res.redirect("https://github.com/gagikharutyunyan12")
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.status(200).json({
                success: true,
                message: "Successfully logged out!"
            })
        } catch (e) {
            next(e)
        }
    }
    async getUserDetails(req, res, next) {
        try {
            const user = await userService.getUserDetails(req.user.id);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;

            await userService.forgotPassword(email);
            return res.json({
                success: true,
                message: `Email sent to ${email} successfully`
            })
        } catch (e) {
            next(e)
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { password } = req.body;

            const user = await userService.resetPassword(password, req.params.token);
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async updatePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;

            const user = await userService.updatePassword(req.user.id, oldPassword, newPassword);
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }


    /*  ADMIN COMMANDS  */
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e)
        }
    }
    async getSingleUser(req, res, next) {
        try {
            const user = await userService.getSingleUser(req.params.id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async deleteUser(req, res, next) {
        try {
            await userService.deleteUser(req.params.id);
            return res.json({
                success: true,
                message: "User successfully deleted"
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();