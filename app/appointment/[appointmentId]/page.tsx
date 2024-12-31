"use client";
import PatientInfoBox from "@/components/MyPatientsPage/PatientDetailsPage/PatientInfoBox/PatientInfoBox";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { appointments } from "@/mock-data/appointments";
import { patients } from "@/mock-data/patients";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { Appointment, Medication, Patient, Prescription } from "@/types/types";
import { prescriptions } from "@/mock-data/prescriptions";
import Image from "next/image";
import TestsSection from "@/components/MyPatientsPage/PatientDetailsPage/TestsSection/TestsSection";
import MedicationsTable from "@/components/AppointmentsPage/MedicationsTable/MedicationsTable";

const CompletedAppointmentDetails: React.FC = () => {
  const { appointmentId } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [prescription, setPrescription] = useState<Prescription>();

  useEffect(() => {
    const appointment = appointments.find((item) => item.id === appointmentId);
    setSelectedAppointment(appointment);

    if (appointment) {
      setSelectedPatient(
        patients.find((item) => item.id === appointment.patient_id)
      );
      setPrescription(
        prescriptions.find((item) => item.id === appointment.prescription_id)
      );
    }
  }, []);

  const handleDeleteMedication = (selectedMedication: Medication) => {
    if (prescription) {
      const updatedMedications = prescription.medications.filter(
        (item) => item !== selectedMedication
      );
      setPrescription({ ...prescription, medications: updatedMedications });
    }
  };

  if (selectedPatient === undefined) {
    return <Loading />;
  }

  return (
    <div className={styles.completedAppointmentDetails}>
      <h2>Appointment Details</h2>
      <div className={styles.detailsContainer}>
        <div className={styles.leftSection}>
          <div className={styles.modalContainer}>
            <div className={styles.infoBox}>
              <span>Date:</span>
              <p>{selectedAppointment?.date}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Time:</span>
              <p>{selectedAppointment?.time}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Duration:</span>
              <p>{`${selectedAppointment?.duration} min.`}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Consultation Type:</span>
              <p>{selectedAppointment?.consultationType}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Reason:</span>
              <p>{selectedAppointment?.reason}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Status:</span>
              <p>{selectedAppointment?.status}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Disease Diagnosis:</span>
              <ul className={styles.diseaseDiagnosis}>
                {selectedAppointment?.diseaseDiagnosis?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.prescriptionContainer}>
            <h3>Prescription</h3>
            <div className={styles.flexContainer}>
              {prescription !== undefined ? (
                <MedicationsTable
                  prescription={prescription}
                  handleDeleteMedication={handleDeleteMedication}
                />
              ) : (
                <p>There is no prescription record for the patient.</p>
              )}
              <div className={styles.prescriptionNote}>
                <h4>Note:</h4>
                <p>{prescription?.notes}</p>
              </div>
            </div>
          </div>
          <div className={styles.testsContainer}>
            <h3>Required Tests</h3>
            <TestsSection selectedPatient={selectedPatient} />
          </div>
        </div>
        <div className={styles.rightSection}>
          <PatientInfoBox selectedPatient={selectedPatient} />
        </div>
      </div>
    </div>
  );
};

export default CompletedAppointmentDetails;
