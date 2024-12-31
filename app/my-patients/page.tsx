"use client";
import SearchFilter from "@/components/MyPatientsPage/PatientFilterOptions/SearchFilter";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { Appointment, Patient, user } from "@/types/types";
import { useLoading } from "@/contexts/LoadingContext";
import { appointments as appointmentList } from "@/mock-data/appointments";
import { patients as mockPatients } from "@/mock-data/patients";
import { users as mockUsers } from "@/mock-data/users";
import Header from "@/components/Header/Header";
import PatientsTable from "@/components/MyPatientsPage/PatientsTable/PatientsTable";
import FilterModal from "@/components/MyPatientsPage/FilterModal/FilterModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPatientModal from "@/components/MyPatientsPage/NewPatientModal/NewPatientModal";

const MyPatients: React.FC = () => {
  const { setLoading } = useLoading();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsToShow, setPatientsToShow] = useState<Patient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };
  const createSuccess = () => {
    toast.success("Patient created successfully!");
  };

  useEffect(() => {
    setLoading(false);
    setAppointments(appointmentList);
    setPatientsToShow(mockPatients);
    setPatients(mockPatients);
  }, []);

  return (
    <>
      <ToastContainer />

      <div className={styles.patientsPageContainer}>
        <h1>Patient List</h1>
        <div className={styles.patientListContainer}>
          <div className={styles.filterOptions}>
            <SearchFilter
              setPatientsToShow={setPatientsToShow}
              appointments={appointments}
              patients={patients}
            />
            <FilterModal setPatientsToShow={setPatientsToShow} />
          </div>
        </div>
        <PatientsTable patientsToShow={patientsToShow} />
        <button className={styles.newPatientBtn} onClick={handleClick}>
          <strong>+</strong> New Patient
        </button>
        {isModalOpen && <NewPatientModal />}
      </div>
    </>
  );
};

export default MyPatients;
