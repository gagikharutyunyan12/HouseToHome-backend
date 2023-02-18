const { AccessClosed } = require('../exceptions/index')

module.exports = function(...roles)  {
    return (req, res, next,) => {
        if(!roles.includes(req.user.role)) {
            return next(new AccessClosed(`Role: ${req.user.role} is not allowed`));
        }
        next()
    }
}