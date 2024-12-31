import { Medication, selectedPatientProp } from "@/types/types";
import styles from "./MedicationSection.module.scss";
import { prescriptions } from "@/mock-data/prescriptions";
import moment from "moment";

const MedicationSection: React.FC<selectedPatientProp> = ({
  selectedPatient,
}) => {
  const currentTime = moment();
  const prescriptionList = prescriptions.filter(
    (item) => item.patient_id === selectedPatient.id
  );

  const allMedications = prescriptionList.flatMap((item) => {
    return item.medications;
  });

  const usedMedications = allMedications.filter((item) => {
    const startTime = moment(item.start_date);
    const endTime = moment(item.end_date);
    return currentTime.isBetween(startTime, endTime);
  });

  return (
    <div className={styles.medicationsSection}>
      <h3>Current Medications</h3>
      <div className={styles.medicationsTableContainer}>
        {usedMedications.length < 1 ? (
          <div className={styles.titleContainer}>
            <p>No medication currently used.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {usedMedications.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MedicationSection;
