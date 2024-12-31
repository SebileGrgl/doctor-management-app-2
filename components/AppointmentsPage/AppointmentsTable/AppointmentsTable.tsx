"use client";
import {
  Appointment,
  AppointmentStatus,
  AppointmentTableProps,
  Patient,
} from "@/types/types";
import styles from "./AppointmentsTable.module.scss";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import AppointmentDetails from "../AppointmentDetails/AppointmentDetails";
import CompletedAppointmentModals from "../CompletedAppointmentModals/CompletedAppointmentModals";
import Link from "next/link";

const AppointmentsTable: React.FC<AppointmentTableProps> = ({
  appointments,
  patients,
  users,
}) => {
  const [updatedAppointments, setUpdatedAppointments] = useState<Appointment[]>(
    []
  );
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isCompletedModalOpen, setIsCompletedModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setUpdatedAppointments(appointments);
  }, [appointments]);

  const sortedAppointments = updatedAppointments.sort(
    (a: Appointment, b: Appointment) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`);
      const dateTimeB = new Date(`${b.date} ${b.time}`);

      return dateTimeB.getTime() - dateTimeA.getTime();
    }
  );

  const findPatient = (patientId: string) => {
    const patient = patients.find((patient) => patient.id === patientId);
    return patient;
  };
  const findDoctorName = (doctorId: string) => {
    const doctor = users.find((user) => user.id === doctorId);
    return doctor?.name;
  };

  const statusClassNames = {
    Completed: styles.completed,
    Cancelled: styles.cancelled,
    Pending: styles.pending,
  };

  const handleStatusChange = (
    changedAppointment: Appointment,
    newStatus: AppointmentStatus
  ) => {
    setUpdatedAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === changedAppointment.id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    if (newStatus === "Completed") {
      setSelectedAppointment(changedAppointment);
      toggleCompletedModal();
      const patient = findPatient(changedAppointment.patient_id);
      patient && setSelectedPatient(patient);
    }
  };

  const openAppointmentModal = (appointment: Appointment) => {
    setAppointmentModal(true);
    setSelectedAppointment(appointment);
    const patient = findPatient(appointment.patient_id);
    patient && setSelectedPatient(patient);
  };

  const closeAppointmentDetails = () => {
    setAppointmentModal(false);
  };

  const handleDeleteAppointment = () => {
    //randevuyu sil
  };

  const toggleCompletedModal = () => {
    setIsCompletedModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.appointmentListContainer}>
      <table className={styles.appointmentsTable}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Day</th>
            <th>Time</th>
            <th>Status</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointments.map((appointment) => {
            return (
              <tr className={styles.appointmentRows} key={appointment.id}>
                <td className={styles.patientInfo}>
                  <img
                    src={findPatient(appointment.patient_id)?.profile_picture}
                    alt="patient-photo"
                  />

                  <div>{`${findPatient(appointment.patient_id)?.first_name} ${
                    findPatient(appointment.patient_id)?.last_name
                  }`}</div>
                </td>
                <td>{findDoctorName(appointment.doctor_id)}</td>
                <td>{appointment.date}</td>
                <td>{moment(appointment.date).format("dddd")}</td>

                <td>{appointment.time}</td>
                <td>
                  <select
                    name="status"
                    id="status"
                    value={appointment.status}
                    className={statusClassNames[appointment.status]}
                    onChange={(e) => {
                      handleStatusChange(
                        appointment,
                        e.target.value as AppointmentStatus
                      );
                    }}
                  >
                    <option>Completed</option>
                    <option>Cancelled</option>
                    <option>Pending</option>
                  </select>
                </td>
                <td className={styles.icons}>
                  {appointment.status === "Completed" ? (
                    <Link href={`/appointment/${appointment.id}`}>
                      <Image
                        className={styles.detailsBtn}
                        src="/visibility.svg"
                        alt="details-icon"
                        width={20}
                        height={20}
                      />
                    </Link>
                  ) : (
                    <Image
                      className={styles.detailsBtn}
                      src="/visibility.svg"
                      alt="details-icon"
                      width={20}
                      height={20}
                      onClick={() => openAppointmentModal(appointment)}
                    />
                  )}
                </td>
                <td className={styles.icons}>
                  <Image
                    className={styles.deleteIcon}
                    src="/delete-icon.svg"
                    alt="delete-icon"
                    width={20}
                    height={20}
                    onClick={handleDeleteAppointment}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {appointmentModal && (
        <AppointmentDetails
          appointment={selectedAppointment}
          patient={selectedPatient}
          closeModal={closeAppointmentDetails}
        />
      )}

      {isCompletedModalOpen && (
        <CompletedAppointmentModals
          appointment={selectedAppointment}
          toggleModal={toggleCompletedModal}
          selectedPatient={selectedPatient}
        />
      )}
    </div>
  );
};

export default AppointmentsTable;
