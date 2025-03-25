const OrderManagementModel = require("../../Models/OrderAndShippingManagement/OrderAndShippingManagementModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let order;
    try {
        order = await OrderManagementModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!order) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ order });
};

//Insert Data
const addData = async (req, res, next) => {
    const { orderID, serviceName, servicePrice, fullName, phone, address, status, userID } = req.body;

    try {
        const order = new OrderManagementModel({
            orderID,
            servicePrice,
            serviceName,
            fullName,
            phone,
            address,
            userID,
            status
        });

        await order.save();

        return res.status(200).json({ order });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let order;
    try {
        order = await OrderManagementModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!order) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ order });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { orderID, serviceName, servicePrice, fullName, phone, address, status, userID } = req.body;

    let order;

    try {
        order = await OrderManagementModel.findByIdAndUpdate(id, {
            orderID: orderID,
            servicePrice: servicePrice,
            serviceName: serviceName,
            fullName: fullName,
            phone: phone,
            address: address,
            status: status,
            userID: userID,
        });
        order = await order.save();
    } catch (err) {
        console.log(err);
    }
    if (!order) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ order });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let order;

    try {
        order = await OrderManagementModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!order) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ order });
};


exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;