"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { Patient } from "@/types/types";
import { patients } from "@/mock-data/patients";
import Loading from "@/app/loading";
import PatientInfoBox from "@/components/MyPatientsPage/PatientDetailsPage/PatientInfoBox/PatientInfoBox";
import AppointmentsSection from "@/components/MyPatientsPage/PatientDetailsPage/AppointmentsSection/AppointmentsSection";
import MedicationSection from "@/components/MyPatientsPage/PatientDetailsPage/MedicationSection/MedicationSection";
import EmergencyContact from "@/components/MyPatientsPage/PatientDetailsPage/EmergencyContact/EmergencyContact";
import TestsSection from "@/components/MyPatientsPage/PatientDetailsPage/TestsSection/TestsSection";

const PatientDetails: React.FC = () => {
  const { patientId } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const findPatient = patients.find((patient) => patient.id === patientId);
    setSelectedPatient(findPatient);
  }, []);
  if (selectedPatient === undefined) {
    return <Loading />;
  }
  return (
    <div className={styles.patientDetailsPage}>
      <div className={styles.leftSection}>
        <AppointmentsSection selectedPatient={selectedPatient} />
        <div className={styles.flexContainer}>
          <MedicationSection selectedPatient={selectedPatient} />
          <EmergencyContact selectedPatient={selectedPatient} />
        </div>
        <div className={styles.testsSection}>
          <h3>Test Records</h3>
          <TestsSection selectedPatient={selectedPatient} />
        </div>
      </div>
      <div className={styles.rightSection}>
        <PatientInfoBox selectedPatient={selectedPatient} />
      </div>
    </div>
  );
};

export default PatientDetails;
