const express         = require("express");
const router          = express.Router();
const controller      = require("../controller/tweet.controller");
const isAuthenticated = require("../middleware/isLoggedin.middleware");

router.get('/get',isAuthenticated, controller.getTweetSuggestions);
router.put('/edit',isAuthenticated,controller.editTweet);
router.delete('/delete',isAuthenticated,controller.deleteTweet);
router.patch('/ai-update/:id',isAuthenticated,controller.editWithAI);

module.exports = router;