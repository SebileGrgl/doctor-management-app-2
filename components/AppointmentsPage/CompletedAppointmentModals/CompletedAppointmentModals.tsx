import {
  CompletedAppointmentModalsProps,
  Medication,
  Prescription,
  Test,
} from "@/types/types";
import styles from "./CompletedAppointmentModals.module.scss";
import Image from "next/image";
import MultiSelectTestOptions from "../MultiSelectTestOptions/MultiSelectTestOptions";
import { useState } from "react";
import tests from "@/mock-data/tests";
import AddPrescriptionsModal from "../AddPrescriptionsModal/AddPrescriptionsModal";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicationsTable from "../MedicationsTable/MedicationsTable";

const CompletedAppointmentModals: React.FC<CompletedAppointmentModalsProps> = ({
  appointment,
  toggleModal,
  selectedPatient,
}) => {
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);
  let user;
  const userJson = localStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  }
  const [prescription, setPrescription] = useState<Prescription>({
    id: "",
    patient_id: selectedPatient?.id || "",
    doctor_id: user.id,
    medications: [],
    prescription_date: moment().format("YYYY-MM-DD"),
    notes: "",
  });
  const [doctorNote, setDoctorNote] = useState<string>("");
  const [newDisease, setNewDisease] = useState<string>("");
  const [addedDiseases, setAddedDiseases] = useState<string[]>([]);

  const handleDeleteMedication = (selectedMedication: Medication) => {
    const updatedMedications = prescription.medications.filter(
      (item) => item !== selectedMedication
    );
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  const handleDeleteDisease = (selectedDisease: string) => {
    const updatedDiseases = addedDiseases.filter(
      (item) => item !== selectedDisease
    );
    setAddedDiseases(updatedDiseases);
  };

  const handleCompleteBtnClick = () => {
    // post prescriptions
    const newPatientTests = selectedTests.map((test) => {
      return {
        appointment_id: appointment?.id,
        test_id: test.id,
        status: "Pending",
      };
    });
    //update selected patient tests and medical record(added diseases)
    //update appointment (note)
    toggleModal();
  };

  const handleAddDisease = () => {
    if (newDisease.length > 3) {
      setAddedDiseases([...addedDiseases, newDisease]);
      setNewDisease("");
      console.log(addedDiseases);
    } else {
      toast.warn("Please enter a valid value.");
    }
  };

  return (
    <div className={styles.overlayContainer}>
      <ToastContainer />
      <Image
        className={styles.closeIcon}
        onClick={toggleModal}
        src="/close-icon.svg"
        alt="close-icon"
        width={30}
        height={30}
      />
      <div className={styles.modalContainer}>
        <div className={styles.testsContainer}>
          <h3>Select required tests:</h3>
          <MultiSelectTestOptions
            options={tests}
            selectedOptions={selectedTests}
            setSelectedOptions={setSelectedTests}
          />
        </div>
        <div className={styles.prescriptionsContainer}>
          <div>
            <h3>Add Medications:</h3>
            <AddPrescriptionsModal
              prescription={prescription}
              setPrescription={setPrescription}
            />
          </div>
          <div className={styles.medicationsTableContainer}>
            <h3>Medication List</h3>
            <MedicationsTable
              prescription={prescription}
              handleDeleteMedication={handleDeleteMedication}
            />
          </div>
        </div>
        <div className={styles.flexRow}>
          <div className={styles.diseasesContainer}>
            <div className={styles.diseaseDiagnosis}>
              <label htmlFor="disease">New disease diagnosis:</label>
              <div>
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                />
                <button onClick={handleAddDisease}>Add</button>
              </div>
            </div>
            {addedDiseases.length > 0 ? (
              <ul className={styles.diseasesList}>
                {addedDiseases.map((item) => (
                  <li key={item}>
                    <p>{item}</p>
                    <span
                      onClick={() => {
                        handleDeleteDisease(item);
                      }}
                    >
                      <Image
                        src="/delete-icon.svg"
                        alt="delete-icon"
                        width={24}
                        height={24}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noDiseaseTitle}>No disease was diagnosed.</p>
            )}
          </div>
          <div className={styles.appointmentNote}>
            <label htmlFor="note">Note:</label>
            <textarea
              rows={7}
              id="note"
              name="note"
              value={doctorNote}
              onChange={(e) => {
                setDoctorNote(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={handleCompleteBtnClick} className={styles.completeBtn}>
          Complete
        </button>
      </div>
    </div>
  );
};

export default CompletedAppointmentModals;
