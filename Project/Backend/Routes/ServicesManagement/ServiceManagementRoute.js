const express = require("express");
const router = express.Router();
const ServiceController = require("../../Controller/ServicesManagement/ServiceManagementController");

router.get("/", ServiceController.getAllDetails);
router.post("/", ServiceController.addData);
router.get("/:id", ServiceController.getById);
router.put("/:id", ServiceController.updateData);
router.delete("/:id", ServiceController.deleteData);
//export
module.exports = router;