"use client";
import styles from "./page.module.scss";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appointment as AppointmentType, Patient, user } from "@/types/types";
import { appointments as appointmentList } from "@/mock-data/appointments";
import { patients as mockPatients } from "@/mock-data/patients";
import { users as mockUsers } from "@/mock-data/users";
import FilterOptions from "@/components/AppointmentsPage/FilterOptions/FilterOptions";
import AppointmentsTable from "@/components/AppointmentsPage/AppointmentsTable/AppointmentsTable";
import NewAppointmentModal from "@/components/AppointmentsPage/NewAppointmentModal/NewAppointmentModal";

const Appointment: React.FC = () => {
  const { setLoading } = useLoading();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const [appointmentsToShow, setAppointmentsToShow] =
    useState<AppointmentType[]>(appointments);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setAppointments(appointmentList);
    setAppointmentsToShow(appointmentList);
    setPatients(mockPatients);
    setUsers(mockUsers);
  }, []);

  const handleNewAppointmentClick = () => {
    setIsNewAppointmentModalOpen((prev) => !prev);
  };
  const createSuccess = () => {
    toast.success("Appointment created successfully!");
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.appointmentsPageContainer}>
        <h1>Appointments</h1>
        <FilterOptions
          setAppointmentsToShow={setAppointmentsToShow}
          appointments={appointments}
          patients={patients}
        />
        <AppointmentsTable
          appointments={appointmentsToShow}
          patients={patients}
          users={users}
        />
        <button
          className={styles.newAppointmentBtn}
          onClick={handleNewAppointmentClick}
        >
          <strong>+</strong> New Appointment
        </button>
        {isNewAppointmentModalOpen && (
          <NewAppointmentModal
            setIsNewAppointmentModalOpen={setIsNewAppointmentModalOpen}
            createSuccess={createSuccess}
          />
        )}
      </div>
    </>
  );
};

export default Appointment;
