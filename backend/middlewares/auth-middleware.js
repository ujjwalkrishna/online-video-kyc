const tokenService = require('../services/token-service');

module.exports = async function (req, res, next) {
    try {
        // const { accessToken } = req.cookies;
        // console.log(accessToken);
        // console.log(req.cookies);
        let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
        //console.log(token);
        if(!token) {
            throw new Error();
        }
        const accessToken = token.split(" ")[0];
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
