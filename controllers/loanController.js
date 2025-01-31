const multer = require("multer");
const path = require("path");
const Loan = require("../models/Loan");

// Set storage engine for file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/", // Directory to save uploaded files
  filename: function (req, file, cb) {
    // Generate a unique filename for each file
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer for file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).fields([
  { name: "applicant_photo", maxCount: 1 },
  { name: "coapplicant_photo", maxCount: 1 },
  { name: "proof_of_identity", maxCount: 1 },
  { name: "proof_of_address", maxCount: 1 },
  { name: "income_proof", maxCount: 1 },
  { name: "educational_documents", maxCount: 1 },
  { name: "applicant_signature", maxCount: 1 },
  { name: "coapplicant_signature", maxCount: 1 },
]);

// Submit Loan Application
exports.submitLoanApplication = (req, res) => {
  // Handle file uploads
  upload(req, res, async (err) => {
    if (err) {
      // Handle file upload errors
      return res.status(500).json({ error: err.message });
    }

    try {
      // Extract form data from the request body
      const loanData = req.body;

      // Map uploaded file paths to the loan data
      const files = req.files;
      if (files.applicant_photo)
        loanData.applicant_photo = files.applicant_photo[0].path;
      if (files.coapplicant_photo)
        loanData.coapplicant_photo = files.coapplicant_photo[0].path;
      if (files.proof_of_identity)
        loanData.proof_of_identity = files.proof_of_identity[0].path;
      if (files.proof_of_address)
        loanData.proof_of_address = files.proof_of_address[0].path;
      if (files.income_proof)
        loanData.income_proof = files.income_proof[0].path;
      if (files.educational_documents)
        loanData.educational_documents = files.educational_documents[0].path;
      if (files.applicant_signature)
        loanData.applicant_signature = files.applicant_signature[0].path;
      if (files.coapplicant_signature)
        loanData.coapplicant_signature = files.coapplicant_signature[0].path;

      // Create a new loan application document
      const loanApplication = new Loan(loanData);

      // Save the loan application to the database
      await loanApplication.save();

      // Send success response
      res
        .status(201)
        .json({ message: "Loan application submitted successfully!" });
    } catch (error) {
      // Handle database or other errors
      res.status(500).json({ error: error.message });
    }
  });
};