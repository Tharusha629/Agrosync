const UserModel = require("../../Models/UserManagement/UserManagementModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let user;
    try {
        user = await UserModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ user });
};

//Insert Data
const addData = async (req, res, next) => {
    const {  fullName, email, password,phone,address } = req.body;

    try {

        // Check if email already exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // If username and email are unique, proceed to create the new manager
        const user = new UserModel({
           
            fullName,
            email,
            password,
            phone,
            address
        });

        await user.save();

        return res.status(200).json({ user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await UserModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ user });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const {  fullName, email, password,phone,address } = req.body;

    let user;

    try {
        user = await UserModel.findByIdAndUpdate(id, {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone,
            address: address
        });
        user = await user.save();
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ user });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await UserModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ user });
};
// Login Controller
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let user;

    try {
        user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.login = login;