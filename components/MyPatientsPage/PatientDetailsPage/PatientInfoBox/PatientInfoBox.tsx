import { Patient, selectedPatientProp } from "@/types/types";
import styles from "./PatientInfoBox.module.scss";
import moment from "moment";

const PatientInfoBox: React.FC<selectedPatientProp> = ({ selectedPatient }) => {
  const calculateAge = (dateOfBirth: string) => {
    return moment().diff(dateOfBirth, "year");
  };

  const formattedPhoneNumber = `(${selectedPatient.contact_info.phone.substring(
    0,
    3
  )}) ${selectedPatient.contact_info.phone.substring(
    3,
    6
  )} ${selectedPatient.contact_info.phone.substring(6, 10)}`;

  return (
    <div className={styles.fixedInfoBoxContainer}>
      <div className={styles.fixedInfoBox}>
        <div className={styles.flexContainer}>
          <div className={styles.imageBox}>
            <img src={selectedPatient?.profile_picture} alt="profile-picture" />
            <p
              className={styles.fullName}
            >{`${selectedPatient?.first_name} ${selectedPatient?.last_name}`}</p>
            <p className={styles.age}>
              {`${calculateAge(selectedPatient.date_of_birth)} Years, ${
                selectedPatient.gender
              }`}
            </p>
          </div>
          <div className={styles.otherInformations}>
            <div className={styles.infoBox}>
              <span>Email</span>
              <p>{selectedPatient.contact_info.email}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Phone Number</span>
              <p>{formattedPhoneNumber}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Date of Birth</span>
              <p>{selectedPatient.date_of_birth}</p>
            </div>
            <div className={styles.infoBox}>
              <span>Diseases</span>
              <p className={styles.diseases}>
                {selectedPatient.medical_history.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bodyInfo}>
          <div className={styles.topRow}>
            <div className={styles.weight}>
              <span>Body Weight</span>
              <p>{selectedPatient.weight} kg</p>
            </div>
            <div className={styles.height}>
              <span>Body Height</span>
              <p>{selectedPatient.height} cm</p>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.bloodType}>
              <span>Blood Type</span>
              <p>{selectedPatient.blood_type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientInfoBox;
