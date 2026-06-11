import Client from "../models/Client.js";
import Appointment from "../models/Appointment.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalClients =
      await Client.countDocuments();

    const totalAppointments =
      await Appointment.countDocuments();

    const completedAppointments =
      await Appointment.countDocuments({
        status: "Completed",
      });

    const scheduledAppointments =
      await Appointment.countDocuments({
        status: "Scheduled",
      });

    res.json({
      totalClients,
      totalAppointments,
      completedAppointments,
      scheduledAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};