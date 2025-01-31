// routes/loanRoutes.js
const express = require("express");
const loanController = require("../controllers/loanController");

const router = express.Router();

router.post("/loan-application", loanController.submitLoanApplication);

module.exports = router;