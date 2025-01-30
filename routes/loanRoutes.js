const express = require("express");
const multer = require("multer");
const LoanApplication = require("../models/Loan");

const router = express.Router();

// File Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Create Loan Application
router.post(
  "/",
  upload.fields([
    { name: "applicantPhoto" },
    { name: "coApplicantPhoto" },
    { name: "proofOfIdentity" },
    { name: "proofOfAddress" },
    { name: "incomeProof" },
    { name: "educationalDocuments" },
    { name: "applicantSignature" },
    { name: "coApplicantSignature" },
  ]),
  async (req, res) => {
    try {
      const {
        applicant,
        coApplicant,
        loanDetails,
      } = req.body;

      const documents = {
        applicantPhoto: req.files["applicantPhoto"]?.[0]?.path,
        coApplicantPhoto: req.files["coApplicantPhoto"]?.[0]?.path,
        proofOfIdentity: req.files["proofOfIdentity"]?.[0]?.path,
        proofOfAddress: req.files["proofOfAddress"]?.[0]?.path,
        incomeProof: req.files["incomeProof"]?.[0]?.path,
        educationalDocuments: req.files["educationalDocuments"]?.[0]?.path,
      };

      const signatures = {
        applicantSignature: req.files["applicantSignature"]?.[0]?.path,
        coApplicantSignature: req.files["coApplicantSignature"]?.[0]?.path,
      };

      const newApplication = new LoanApplication({
        applicant: JSON.parse(applicant),
        coApplicant: JSON.parse(coApplicant),
        loanDetails: JSON.parse(loanDetails),
        documents,
        signatures,
      });

      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
