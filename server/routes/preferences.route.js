const express         = require("express");
const router          = express.Router();
const controller      = require("../controller/preferences.controller");
const isAuthenticated = require("../middleware/isLoggedin.middleware");

router.get('/get',isAuthenticated,controller.getUserPreferences);
router.put('/update',isAuthenticated,controller.updatePreferences);

module.exports = router;