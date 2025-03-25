const express = require("express");
const router = express.Router();
const UserController = require("../../Controller/UserManagement/UserManagementController");

router.get("/", UserController.getAllDetails);
router.post("/", UserController.addData);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateData);
router.delete("/:id", UserController.deleteData);
router.post("/login", UserController.login);
//export
module.exports = router;