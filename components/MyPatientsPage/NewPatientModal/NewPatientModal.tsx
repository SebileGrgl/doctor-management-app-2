import styles from "./NewPatientModal.module.scss";

const NewPatientModal: React.FC = () => {
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.modalContainer}>
        <h1>New Patient</h1>
        <form className={styles.newPatientForm}>
          <div className={styles.patientInfo}>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" name="gender" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="bloodType">Blood Type:</label>
            <input type="text" name="bloodType" id="bloodType" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="weight">Weight:</label>
            <input type="text" name="weight" id="weight" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="height">Weight:</label>
            <input type="text" name="height" id="height" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="DateOfBirth">Date of Birth:</label>
            <select name="DateOfBirth" id="DateOfBirth"></select>
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="medicalHistory">Medical History:</label>
            <input type="text" name="medicalHistory" id="medicalHistory" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="allergies">Allergies:</label>
            <input type="text" name="allergies" id="allergies" />
          </div>
          <div className={styles.patientInfo}>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="text" name="profilePicture" id="profilePicture" />
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelBtn}>Cancel</button>
            <input type="submit" value="Create" className={styles.createBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatientModal;
