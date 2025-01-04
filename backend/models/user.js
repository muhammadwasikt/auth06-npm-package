const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    name: { type: String},
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Date },
    emailOtp: { type: String },
    emailOtpExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    emailVerified: { type: Boolean, default: false },
}, {timestamps: true })


const User = mongoose.model('User', UserSchema);

module.exports = {User};