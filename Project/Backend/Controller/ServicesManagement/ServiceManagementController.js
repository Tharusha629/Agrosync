const ServiceManagementModel = require("../../Models/ServicesManagement/ServiceManagementModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let service;
    try {
        service = await ServiceManagementModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!service) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ service });
};

//Insert Data
const addData = async (req, res, next) => {
    const { serviceID, title, description, serviceSet, price } = req.body;

    try {
        // Check if a service with the same title already exists
        const existingService = await ServiceManagementModel.findOne({ title });

        if (existingService) {
            return res.status(400).json({ message: "This service already exists!" });
        }

        // If the title is unique, proceed to add the service
        const service = new ServiceManagementModel({
            serviceID,
            title,
            description,
            serviceSet,
            price,
        });

        await service.save();

        return res.status(200).json({ service });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let service;
    try {
        service = await ServiceManagementModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!service) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ service });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { serviceID, title, description, serviceSet, price } = req.body;

    let service;

    try {
        service = await ServiceManagementModel.findByIdAndUpdate(id, {
            serviceID: serviceID,
            title: title,
            description: description,
            serviceSet: serviceSet,
            price: price,
            
        });
        service = await service.save();
    } catch (err) {
        console.log(err);
    }
    if (!service) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ service });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let service;

    try {
        service = await ServiceManagementModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!service) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ service });
};


exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;