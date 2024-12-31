"use client";
import Image from "next/image";
import styles from "./PatientAnalytics.module.scss";
import { yearlyPatientPercentage } from "@/mock-data/patientPercentage";
import { ChangeEvent, useEffect, useState } from "react";
import { YearlyPatientPercentage } from "@/types/types";
import { useLoading } from "@/contexts/LoadingContext";

const PatientAnalytics: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedYearAnalytics, setSelectedYearAnalytics] = useState<
    YearlyPatientPercentage | undefined
  >(
    yearlyPatientPercentage.find((item) => item.year === currentYear) ||
      undefined
  );
  const { setLoading } = useLoading();

  const getYears = () => {
    const startYear = 2020;

    const years: number[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  };

  const analyticYears = getYears();

  useEffect(() => {
    const filteredAnalytics = yearlyPatientPercentage.find((item) => {
      return item.year.toString() === selectedYear;
    });
    setSelectedYearAnalytics(filteredAnalytics);
    setLoading(false);
  }, [selectedYear]);

  return (
    <div className={styles.patientAnalyticsContainer}>
      <div className={styles.titleBox}>
        <h2>Patients</h2>
        <select
          name="years"
          id="years"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        >
          {analyticYears.map((year) => {
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.patientAnalytics}>
        <div className={styles.analytics}>
          <div className={styles.newPatientIcon}>
            <Image
              src="/new-patient-icon.svg"
              alt="person-icon"
              width={24}
              height={24}
            />
          </div>
          <div className={styles.analyticDetails}>
            <div className={styles.patientPercentage}>
              <span>{selectedYearAnalytics?.new_patients_percentage}%</span>
              <p>New Patient</p>
            </div>
          </div>
        </div>
        <div className={styles.analytics}>
          <div className={styles.oldPatientIcon}>
            <Image
              src="/old-patient-icon.svg"
              alt="person-icon"
              width={24}
              height={24}
            />
          </div>
          <div className={styles.analyticDetails}>
            <div className={styles.patientPercentage}>
              <span>
                {selectedYearAnalytics?.existing_patients_percentage}%
              </span>
              <p>Old Patient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAnalytics;
