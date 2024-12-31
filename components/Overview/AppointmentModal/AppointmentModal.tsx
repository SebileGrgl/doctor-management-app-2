import Image from "next/image";
import styles from "./AppointmentModal.module.scss";
import { AppointmentModalProps } from "@/types/types";

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  closeModal,
  patient,
}) => {
  return (
    <div className={styles.overlayContainer}>
      <Image
        className={styles.closeIcon}
        onClick={closeModal}
        src="/close-icon.svg"
        alt="close-icon"
        width={30}
        height={30}
      />
      <div className={styles.modalContainer}>
        <div className={styles.patientInfo}>
          <img src={patient?.profile_picture} alt="patient-photo" />

          <p>{`${patient?.first_name} ${patient?.last_name}`}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Date:</span>
          <p>{appointment?.date}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Time:</span>
          <p>{appointment?.time}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Duration:</span>
          <p>{`${appointment?.duration} min.`}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Consultation Type:</span>
          <p>{appointment?.consultationType}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Reason:</span>
          <p>{appointment?.reason}</p>
        </div>
        <div className={styles.infoBox}>
          <span>Status:</span>
          <p>{appointment?.status}</p>
        </div>
      </div>
    </div>
  );
};
export default AppointmentModal;
