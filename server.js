const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path= require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const DB_URI = "mongodb://localhost:27017/loan_application_db";
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Routes
const Loan = require("./models/Loan");
app.post("/api/loan-application", async (req, res) => {
  try {
    const loanApplication = new Loan(req.body);
    await loanApplication.save();
    res.status(201).json({ message: "Loan application submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
