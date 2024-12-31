import { PatientTest, selectedPatientProp } from "@/types/types";
import styles from "./TestsSection.module.scss";
import { useEffect, useState } from "react";
import tests from "@/mock-data/tests";

const TestsSection: React.FC<selectedPatientProp> = ({ selectedPatient }) => {
  const [patientTests, setPatientTests] = useState<PatientTest[]>([]);

  useEffect(() => {
    setPatientTests(selectedPatient.tests);
  }, []);

  const statusClassNames: Record<string, string> = {
    Completed: styles.completed,
    Pending: styles.pending,
  };

  return (
    <div className={styles.testsTableContainer}>
      {patientTests.length > 0 ? (
        <table className={styles.testsTable}>
          <thead>
            <tr className={styles.stickyHeader}>
              <th>Test</th>
              <th>Status</th>
              <th>Date</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {patientTests.map((test) => {
              return (
                <tr className={styles.testRow} key={test.test_id}>
                  <td>
                    {tests.find((item) => item.id === test.test_id)?.name}
                  </td>
                  <td>
                    <span className={statusClassNames[test.status]}>
                      {test.status}
                    </span>
                  </td>
                  <td>{test.date ? test.date : "-"}</td>
                  <td>
                    {test.result ? (
                      <a href={test.result}>{test.result}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.noTestContainer}>
          The patient does not have any test records.
        </p>
      )}
    </div>
  );
};

export default TestsSection;
