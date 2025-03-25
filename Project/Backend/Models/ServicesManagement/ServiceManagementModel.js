const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceManagementSchema = new Schema({
    serviceID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    serviceSet: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("ServiceManagement", ServiceManagementSchema);