const express         = require('express');
const authController  = require("../controller/auth.controller");

const router         = express.Router();

router.post('/login',authController.loginWithX);

router.get('/callback', authController.XAuthCallback);

module.exports = router;