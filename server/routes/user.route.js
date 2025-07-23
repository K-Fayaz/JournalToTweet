const express         = require('express');
const authController  = require("../controller/auth.controller");

const router         = express.Router();

router.post('/login',authController.login);

router.post('/signup',authController.signUp);

router.post('/email-verification', authController.emailVerification);

router.post('/resend-verification', authController.resendVerification);

module.exports = router;