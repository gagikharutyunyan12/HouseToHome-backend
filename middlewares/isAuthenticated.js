const { AuthError } = require('../exceptions/index');
const tokenService = require('../services/token.service');
const { REQUIRED } = require('../utils/constants')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new Error(REQUIRED("Authorization Header ")));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new AuthError("token not found"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(new AuthError("user not authorized"));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new AuthError(e.message));
    }
}