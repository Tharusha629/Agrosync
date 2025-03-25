const express = require("express");
const router = express.Router();
const OrderController = require("../../Controller/OrderAndShippingManagement/OrderAndShippingManagementController");
const OrderManagementModel = require("../../Models/OrderAndShippingManagement/OrderAndShippingManagementModel");
const nodemailer = require("nodemailer");

router.get("/", OrderController.getAllDetails);
router.post("/", OrderController.addData);
router.get("/:id", OrderController.getById);
router.put("/:id", OrderController.updateData); 
router.delete("/:id", OrderController.deleteData); 

router.post("/send-email", async (req, res) => {
    const { email } = req.body;
    try { 
        // Generate random 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000);
 
        // Create transport for sending the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification Code",
            text: `Your verification code is ${code}`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send({ message: "Error sending email", error: error.message });
            }
            console.log("Email sent:", info.response);
            res.status(200).send({ message: "Verification code sent", code });
        });
    } catch (error) {
        console.error("Error during email sending process", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
});

// Export the router
module.exports = router;