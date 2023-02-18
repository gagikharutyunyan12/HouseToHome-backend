const VALIDATION_ERROR = "Request didn't pass validation";
const SOMETHING_WENT_WRONG = "Something went wrong, please try again";
const ALREADY_EXISTS = resource => `${resource} already exists!`;
const NOT_EXISTS = resource => `${resource} doesn't exist!`;
const IS_INVALID = resource => `${resource} is invalid`;
const REQUIRED = resource => `${resource} is required`;
const mongoUrl = process.env.MONGO_URL;

module.exports = {REQUIRED, VALIDATION_ERROR, SOMETHING_WENT_WRONG, ALREADY_EXISTS, NOT_EXISTS, IS_INVALID, mongoUrl }