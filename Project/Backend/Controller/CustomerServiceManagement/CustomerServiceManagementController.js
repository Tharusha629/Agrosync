const CustomerModel = require("../../Models/CustomerServiceManagement/CustomerServiceManagementModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let inquirie;
    try {
        inquirie = await CustomerModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!inquirie) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ inquirie });
};

//Insert Data
const addData = async (req, res, next) => {
    const { inquirieID, userID, fullName, email, subject, inquirieMsg } = req.body;

    try {
        const inquirie = new CustomerModel({
            inquirieID,
            userID,
            fullName,
            email,
            subject,
            inquirieMsg
        });

        await inquirie.save();

        return res.status(200).json({ inquirie });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let inquirie;
    try {
        inquirie = await CustomerModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!inquirie) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ inquirie });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { inquirieID, userID, fullName, email, subject, inquirieMsg, reply} = req.body;

    let inquirie;

    try {
        inquirie = await CustomerModel.findByIdAndUpdate(id, {
            inquirieID: inquirieID,
            userID: userID,
            fullName: fullName,
            email: email,
            subject: subject,
            inquirieMsg: inquirieMsg,
            reply: reply,
        });
        inquirie = await inquirie.save();
    } catch (err) {
        console.log(err);
    }
    if (!inquirie) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ inquirie });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let inquirie;

    try {
        inquirie = await CustomerModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!inquirie) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ inquirie });
};


exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;