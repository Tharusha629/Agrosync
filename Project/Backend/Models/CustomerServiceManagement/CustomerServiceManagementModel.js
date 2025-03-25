const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerServiceManagementSchema = new Schema({
    inquirieID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    inquirieMsg: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
    },
});

module.exports = mongoose.model("CustomerServiceManagement", CustomerServiceManagementSchema);