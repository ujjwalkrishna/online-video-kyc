const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        phone: { type: String, required: true },
        name: { type: String, required: false },
        email: {type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        fatherName: { type: String, required: false },
        motherName: { type: String, required: false },
        gender: { type: String, required: false },
        kycEmail: { type: String, required: false },
        panNumber: { type: String, required: false },
        permanentAddress: { type: String, required: false },
        occupation: { type: String, required: false },
        aadharNumber: { type: String, required: false },
        aadharFrontUrl: { type: String, required: false },
        aadharBackUrl: { type: String, required: false },
        panFrontUrl: { type: String, required: false },
        panBackUrl: { type: String, required: false },
        bankAccountNumber: { type: String, required: false },
        bankIfscCode: { type: String, required: false },
        accountHolderName: { type: String, required: false },
        locationLatitude: { type: String },
        locationLongitude: { type: String },
        mobileNumber: { type: String, required: false },
        signatureUrl: { type: String, required: false },
        userPhotoUrl: { type: String, required: false }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

module.exports = mongoose.model('User', userSchema, 'users');
