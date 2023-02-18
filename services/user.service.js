const UserRepositories = require('../repositories/user.repositories');
const UserDto = require('../dto/userDto');
const uuid = require('uuid');
const { BadRequest, AuthError, NotFound, ValidationError } = require('../exceptions/index')
const {ALREADY_EXISTS, IS_INVALID, NOT_EXISTS} = require("../utils/constants");
const tokenService = require('./token.service');
const mailService = require('./mail.service')
const {ServiceUnavailable} = require("../exceptions");
const crypto = require('crypto')
class UserService extends UserRepositories {
    constructor() {
        super();
    }
    async register(email, password, phoneNumber, firstName, lastName, role) {
        const user = await this.checkUser(email);

        if(user) {
            throw new BadRequest(ALREADY_EXISTS(email));
        }


        const activationLink = uuid.v4();

        const newUser = await this.createUser(email, password, phoneNumber, firstName, lastName, role);
        await mailService.sendActivationMail(email, `${process.env.APi_URL}/api/v1/activate/${activationLink}`)

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}

    }

    async activate(activationLink) {
        const user = await this.checkActivationLink(activationLink);
        if(!user) {
            throw new BadRequest(IS_INVALID(activationLink));
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        if (!email || !password) {
            throw new ValidationError(IS_INVALID);
        }

        const user = await this.checkUser(email)
        if (!user) {
            throw new NotFound(NOT_EXISTS('email'));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched) {
            throw new BadRequest(IS_INVALID("password"));
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async getUserDetails(id) {
        const user = await this.getById(id);
        return user
    }
    async forgotPassword(email) {
        const user = await this.checkUser(email);
        if (!user) {
            throw new NotFound(NOT_EXISTS('email'));
        }

        const resetToken = await user.getResetPasswordToken();

        await user.save();

        const resetPasswordUrl = `${process.env.API_URL}/password/reset/${resetToken}`

        try {
            await mailService.sendResetPasswordLink(user.email, resetPasswordUrl)
            return;
        } catch (e) {
            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined;

            await user.save();
            return new ServiceUnavailable(e.message);
        }
    }
    async resetPassword(password, token) {
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await this.getByResetPasswordToken(resetPasswordToken);

        if(!user) {
            throw new NotFound(NOT_EXISTS('email'));
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async updatePassword(id, oldPassword, newPassword) {
        const user = await this.getById(id);

        const isPasswordMatched = await user.comparePassword(oldPassword);
        if(!isPasswordMatched) {
            throw new BadRequest(IS_INVALID(" old password"));
        }
        user.password = newPassword;

        await user.save();
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async getAllUsers() {
        const users = await this.getAllUsers();
        return users
    }
    async getSingleUser(id) {
        const user = await this.getById(id)
        return user
    }
    async deleteUser(id) {
        const user = await this.deleteUser(id)
        return user;
    }
}

module.exports = new UserService();