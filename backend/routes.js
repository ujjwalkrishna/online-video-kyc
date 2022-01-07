const router = require('express').Router();
const authController = require('./controllers/auth-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const docsController = require('./controllers/docs-controller');
const adminController = require('./controllers/admin-controller');
const vd = require('./multer-config');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/verify-user', authController.verifyUser);
router.post('/api/store-doc-images', authMiddleware, docsController.saveFiles);
router.post('/api/store-user-biometric', authMiddleware, docsController.saveBiometric);
router.post('/api/store-basic-info', authMiddleware, docsController.storeBasicInfo);
router.post('/api/store-bank-info', authMiddleware, docsController.storeBankInfo);
router.get('/api/req-appointment', authMiddleware, docsController.reqAppointment);
router.post('/api/confirm-appointment', authMiddleware, adminController.confirmAppointment);
router.post('/api/store-lat-lng', authMiddleware, docsController.storeLatLng)
router.post('/api/store-recorded-video', authMiddleware, vd, docsController.saveRecordedVideo);

router.post('/api/search-user', authMiddleware, adminController.searchUser);
router.post('/api/get-user-data', authMiddleware, adminController.getUserData);
router.get('/api/get-all-intreq', authMiddleware, adminController.getAllApointments);

router.get('/api/get-appointment', authMiddleware, docsController.getAppointment);

router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout)

module.exports = router;
