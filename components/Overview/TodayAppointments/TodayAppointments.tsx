"use client";
import { Appointment, Patient, TodayAppointmentsProps } from "@/types/types";
import styles from "./TodayAppointments.module.scss";
import moment from "moment";
import { patients as mockPatients } from "@/mock-data/patients";
import { useEffect, useState } from "react";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const TodayAppointments: React.FC<TodayAppointmentsProps> = ({
  appointmentList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  const today = new Date();
  const date = moment(today);
  const formattedDate = date.format("YYYY-MM-DD");

  const todayAppointments = appointmentList.filter(
    (appointment) => appointment.date === formattedDate
  );

  const sortedAppointments = todayAppointments.sort(
    (a: Appointment, b: Appointment) => {
      const statusOrder: { [key: string]: number } = {
        Pending: 1,
        Completed: 2,
        Cancelled: 3,
      };

      const statusComparison = statusOrder[a.status] - statusOrder[b.status];

      if (statusComparison === 0) {
        const dateTimeA = new Date(`${a.date} ${a.time}`);
        const dateTimeB = new Date(`${b.date} ${b.time}`);

        return dateTimeA.getTime() - dateTimeB.getTime();
      }

      return statusComparison;
    }
  );

  const findPatient = (id: string) => {
    const patient = patients.find((person) => person.id === id);
    return patient;
  };

  const isOngoingAppointment = (appointment: Appointment) => {
    const startTime = moment(appointment.time, "HH:mm A");
    const endTime = moment(appointment.time, "HH:mm A").add(
      appointment.duration,
      "minutes"
    );
    const currentTime = moment();
    if (appointment.status === "Cancelled") {
      return { text: appointment.status, color: " #ff6348" };
    } else if (currentTime.isBetween(startTime, endTime)) {
      return { text: "Ongoing", color: "#ffa502" };
    } else if (currentTime.isBefore(startTime)) {
      return { text: appointment.time, color: "inherit" };
    } else {
      return { text: appointment.status, color: "  #4b7bec" };
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    setIsModalOpen(true);

    const patient = findPatient(appointment.patient_id);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      console.error("Patient not found");
      setSelectedPatient(null);
    }
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.todayAppointments}>
      <h2>Today Appointments</h2>
      <div className={styles.appointmentsContainer}>
        {sortedAppointments.map((appointment) => {
          return (
            <div
              className={styles.appointmentBox}
              key={appointment.id}
              onClick={() => {
                handleAppointmentClick(appointment);
              }}
            >
              <img
                src={findPatient(appointment.patient_id)?.profile_picture}
                alt="patient-photo"
                width={34}
                height={34}
              />
              <div className={styles.details}>
                <div>
                  <p className={styles.patientName}>
                    {findPatient(appointment.patient_id)?.first_name +
                      " " +
                      findPatient(appointment.patient_id)?.last_name}
                  </p>
                  <p className={styles.consultationType}>
                    {appointment.consultationType}
                  </p>
                </div>
                <span
                  style={{
                    color: isOngoingAppointment(appointment).color,
                  }}
                >
                  {isOngoingAppointment(appointment).text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          closeModal={closeModal}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default TodayAppointments;
