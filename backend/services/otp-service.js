require('dotenv').config()
var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const crypto = require('crypto');
const hashService = require('./hash-service');

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let refresh_token = process.env.REFRESH_TOKEN;

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendByEmail(email, otp, subject, text) {
        return new Promise((resolve, reject) => {
            let admin = "ujjwal48.dev@gmail.com"

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
            const OAuth2 = google.auth.OAuth2;

            const oauth2Client = new OAuth2(
                client_id,
                client_secret,
                "https://developers.google.com/oauthplayground"
            );

            oauth2Client.setCredentials({
                refresh_token: refresh_token
            });

            var accessToken = oauth2Client.getAccessToken()

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: "OAuth2",
                    user: admin,
                    clientId: client_id,
                    clientSecret: client_secret,
                    refreshToken: refresh_token,
                    accessToken: accessToken
                }
            });

            var mailOptions = {
                from: admin,
                to: email,
                subject: subject,
                text: text
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return reject("Something went wrong");
                } else {
                    console.log('Email sent: ' + info.response);
                    return resolve("Success");
                }
            });
        })
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
