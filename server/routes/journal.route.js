const express = require("express");
const router = express.Router();
const controller = require("../controller/journal.controller");
const isAuthenticated = require("../middleware/isLoggedin.middleware");

router.get('/get',isAuthenticated,controller.getJournal);
router.get('/activity',isAuthenticated,controller.getAcivity);
router.post('/add',isAuthenticated,controller.AddJournal);
router.patch('/update',isAuthenticated,controller.editJournalEntry);
router.delete('/delete', isAuthenticated, controller.deleteJournalEntry);

module.exports = router;