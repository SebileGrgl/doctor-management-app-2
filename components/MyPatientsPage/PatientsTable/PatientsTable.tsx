import { Patient, PatientsTableProps } from "@/types/types";
import styles from "./PatientsTable.module.scss";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const PatientsTable: React.FC<PatientsTableProps> = ({ patientsToShow }) => {
  const sortedPatients = patientsToShow.sort((a: Patient, b: Patient) => {
    const dateTimeA = new Date(a.date_of_joining);
    const dateTimeB = new Date(b.date_of_joining);

    return dateTimeB.getTime() - dateTimeA.getTime();
  });

  const handleDeletePatient = (patient: Patient) => {
    // Hastayı sil
  };

  return (
    <div className={styles.patientsListContainer}>
      <table className={styles.patientsTable}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Patient Id</th>
            <th>Date Of Joining</th>
            <th>Gender</th>
            <th>Diseases</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients.map((patient) => {
            return (
              <tr className={styles.patientRows} key={patient.id}>
                <td className={styles.patientInfo}>
                  <img src={patient.profile_picture} alt="profile-photo" />
                  <div>{`${patient.first_name} ${patient.last_name}`}</div>
                </td>
                <td>{patient.id}</td>
                <td>{patient.date_of_joining}</td>
                <td>{patient.gender}</td>
                <td>
                  <ul className={styles.medicalHistory}>
                    {patient.medical_history.map((disease) => (
                      <li key={disease}>{disease}</li>
                    ))}
                  </ul>
                </td>
                <td className={styles.icons}>
                  <Link href={`/my-patients/${patient.id}`}>
                    <Image
                      className={styles.detailsBtn}
                      src="/visibility.svg"
                      alt="details-icon"
                      width={20}
                      height={20}
                    />
                  </Link>
                </td>
                <td className={styles.icons}>
                  <Image
                    className={styles.deleteIcon}
                    src="/delete-icon.svg"
                    alt="delete-icon"
                    width={20}
                    height={20}
                    onClick={() => {
                      handleDeletePatient(patient);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
