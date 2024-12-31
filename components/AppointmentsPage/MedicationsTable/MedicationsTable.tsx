import Image from "next/image";
import styles from "./MedicationsTable.module.scss";
import { MedicationsTableProp, Prescription } from "@/types/types";

const MedicationsTable: React.FC<MedicationsTableProp> = ({
  prescription,
  handleDeleteMedication,
}) => {
  return (
    <div className={styles.medicationsTableContainer}>
      {prescription.medications.length > 0 ? (
        <div className={styles.medicationsTable}>
          <table>
            <thead>
              <tr className={styles.stickyHeader}>
                <th>Name</th>
                <th>Dosage</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prescription.medications.map((item) => {
                return (
                  <tr key={item.name} className={styles.rows}>
                    <td>{item.name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td className={styles.deleteTd}>
                      <Image
                        src="/delete-icon.svg"
                        alt="delete-icon"
                        className={styles.deleteIcon}
                        width={20}
                        height={20}
                        onClick={() => {
                          handleDeleteMedication(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noMedicationsTitle}>
          You haven't added any medication yet.
        </p>
      )}
    </div>
  );
};

export default MedicationsTable;
