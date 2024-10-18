const { Router } = require("express");
const appointmentController = require("../controllers/appoinment/appointment.controller");
const { sendZnsMessage } = require("../utils/znsService");
const router = Router();

router.post("/create", appointmentController.createAppointment);
router.post("/update-status", appointmentController.updateStatusAppointment);
router.get("/list-time", appointmentController.getAvailableTimeSlots);
router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);
router.post("/query", appointmentController.getListAppointmentQuery);
router.post("/send-zns", async (req, res) => {
  const { phone, templateData } = req.body;
  //   console.log({ phone, templateData });

  try {
    const result = await sendZnsMessage(phone, templateData);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending ZNS");
  }
});

module.exports = router;
