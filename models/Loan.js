const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  applicant: {
    firstName: String,
    middleName: String,
    lastName: String,
    dob: Date,
    gender: String,
    maritalStatus: String,
    occupation: String,
    income: Number,
    phone: String,
    email: String,
    address: String,
  },
  coapplicant: {
    firstName: String,
    middleName: String,
    lastName: String,
    dob: Date,
    gender: String,
    maritalStatus: String,
    occupation: String,
    income: Number,
    phone: String,
    email: String,
  },
  loanDetails: {
    amount: Number,
    purpose: String,
    tenure: Number,
  },
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
