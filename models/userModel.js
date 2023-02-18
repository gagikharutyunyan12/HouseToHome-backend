const {model, Schema} = require("mongoose");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: false
    },
    favorites: [{
        type: ObjectId, ref: "Properties",
    }],
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
      type: String
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "local", "admin"]
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {timestamps: true})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = async function() {
    const generateResetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(generateResetToken).digest("hex");
    this.resetPasswordExpires = Date.now() + 15 * 60 * 60 * 1000;

    return generateResetToken;
}



module.exports = model("User", userSchema);