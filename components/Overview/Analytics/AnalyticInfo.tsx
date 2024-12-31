import { useLoading } from "@/contexts/LoadingContext";
import { appointments as mockAppointments } from "@/mock-data/appointments";
import { patients as mockPatients } from "@/mock-data/patients";
import { AnalyticItem, Appointment, Patient } from "@/types/types";
import { useEffect, useState } from "react";

const AnalyticInfo = (): AnalyticItem[] => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const { setLoading } = useLoading();
  useEffect(() => {
    setAppointments(mockAppointments);
    setPatients(mockPatients);
    setLoading(false);
  }, []);

  const totalAppointment = appointments.length;
  const totalPatients = patients.length;
  const clinicConsulting = appointments.filter(
    (appointment) => appointment.consultationType === "Clinic Consulting"
  );
  const videoConsulting = appointments.filter(
    (appointment) => appointment.consultationType === "Video Consulting"
  );

  const analyticInfo = [
    {
      title: "Appointment",
      total: totalAppointment,
      icon: "/appointment.svg",
      color: "#6c5ce7",
    },
    {
      title: "Total Patient",
      total: totalPatients,
      icon: "/person-icon.svg",
      color: "#ff6348",
    },
    {
      title: "Clinic Consulting",
      total: clinicConsulting.length,
      icon: "/clinic-consulting.svg",
      color: "#ffa502",
    },
    {
      title: "Video Consulting",
      total: videoConsulting.length,
      icon: "/video.svg",
      color: "#4b7bec",
    },
  ];

  return analyticInfo;
};
export default AnalyticInfo;
