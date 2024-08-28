const express = require("express");
const EmailController = require("../controllers/EmailController");
const router = express.Router();

router.post("/send", EmailController.sendEmail);

module.exports = router;
