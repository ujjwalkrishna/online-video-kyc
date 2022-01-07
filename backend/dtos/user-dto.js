class UserDto {
    id;
    phone;
    name;
    email;
    role;
    aadharFront;
    aadharBack;
    panFront;
    panBack;
    signatureUrl;
    userPhotoUrl;
    // createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone ? user.phone : null;
        this.name = user.name ? user.name : null;
        this.email = user.email ? user.email: null;
        this.role = user.role;
        this.firstName = user.firstName ? user.firstName: null;
        this.lastName = user.lastName ? user.lastName: null;
        this.aadharFront = user.aadharFrontUrl ? `${process.env.BASE_URL}${user.aadharFrontUrl}`: null;
        this.aadharBack = user.aadharBackUrl ? `${process.env.BASE_URL}${user.aadharBackUrl}`: null;
        this.panFront = user.panFrontUrl ? `${process.env.BASE_URL}${user.panFrontUrl}`: null;
        this.panBack = user.panBackUrl ? `${process.env.BASE_URL}${user.panBackUrl}`: null;
        this.permanentAddress = user.permanentAddress ? user.permanentAddress: null;
        this.occupation = user.occupation ? user.occupation: null;
        this.gender = user.gender ? user.gender: null;
        this.kycEmail = user.kycEmail ? user.kycEmail: null;
        this.fatherName = user.fatherName ? user.fatherName: null;
        this.motherName = user.motherName ? user.motherName: null;
        this.locationLatitude = user.locationLatitude ? user.locationLatitude: null;
        this.locationLongitude = user.locationLongitude ? user.locationLongitude: null;

        this.bankAccountNumber = user.bankAccountNumber ? user.bankAccountNumber : null;
        this.bankIfscCode = user.bankIfscCode ? user.bankIfscCode : null;
        this.accountHolderName = user.accountHolderName ? user.accountHolderName : null;
        this.mobileNumber = user.mobileNumber ? user.mobileNumber : null;
        this.signatureUrl = user.signatureUrl ? `${process.env.BASE_URL}${user.signatureUrl}`: null;
        this.userPhotoUrl = user.userPhotoUrl ? `${process.env.BASE_URL}${user.userPhotoUrl}`: null;
        // this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;
