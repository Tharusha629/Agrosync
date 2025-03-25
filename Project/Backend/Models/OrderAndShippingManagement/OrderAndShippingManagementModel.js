const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderManagementSchema = new Schema({
    orderID: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        expires: 864000, 
    },
});

module.exports = mongoose.model("OrderManagement", OrderManagementSchema);