import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createAppointment)
  .get(protect, getAppointments);

router
  .route("/:id")
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

export default router;