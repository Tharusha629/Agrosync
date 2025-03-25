const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controller/CustomerServiceManagement/CustomerServiceManagementController");

router.get("/", CustomerController.getAllDetails);
router.post("/", CustomerController.addData);
router.get("/:id", CustomerController.getById);
router.put("/:id", CustomerController.updateData);
router.delete("/:id", CustomerController.deleteData);
//export
module.exports = router;