const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {
        // return res.status(500).json({ message: 'message sending failed' });

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email field is required!' });
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 4; // 2 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            let resp = await otpService.sendByEmail(email, otp, 'One Time Password (TVS)', `Dear Sir/Madam, Your One Time Password(OTP) is: ${otp}`);
            console.log(resp);
            return res.json({
                hash: `${hash}.${expires}`,
                email,
                otp,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'message sending failed' });
        }
    }

    async verifyOtp(req, res) {
        const { name, email, phone, pass, otp, hash } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${email}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await userService.findUser({ email });
            if (!user) {
                let passPattern = `${email.toLowerCase()}.${pass}`
                let hashedPass = hashService.hashOtp(passPattern);
                user = await userService.createUser({ name, email: email.toLowerCase(), phone, password: hashedPass, otp, hash });
            } else {
                return res.status(422).json({ message: 'User already exits' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        // res.cookie('refreshToken', refreshToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        // res.cookie('accessToken', accessToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true, accessToken, refreshToken });
    }

    async verifyUser(req, res) {
        const { email, pass } = req.body;
        if (!email || !pass) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        let passPattern = `${email.toLowerCase()}.${pass}`
        let hashedPass = hashService.hashOtp(passPattern);

        let user;
        try {
            user = await userService.findUser({ email: email.toLowerCase(), password: hashedPass });
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        // res.cookie('refreshToken', refreshToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        // res.cookie('accessToken', accessToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true, accessToken, refreshToken });
    }

    async refresh(req, res) {
        // get refresh token from cookie
        // const { refreshToken: refreshTokenFromCookie } = req.cookies;
        let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
        const refreshTokenFromCookie = token.split(" ")[1];
        // check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        // Check if token is in db
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }

        // check if valid user
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }

        // Generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({
            _id: userData._id,
        });

        // Update refresh token
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // put in cookie
        // res.cookie('refreshToken', refreshToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        // res.cookie('accessToken', accessToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        // response
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true, accessToken, refreshToken });
    }

    async logout(req, res) {
        // const { refreshToken } = req.cookies;
        let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
        const refreshToken = token.split(" ")[1];
        // delete refresh token from db
        await tokenService.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }
}

module.exports = new AuthController();
