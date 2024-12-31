"use client";
import { YearlyGenderRatio } from "@/types/types";
import styles from "./GenderAnalytics.module.scss";
import GenderChart from "./GenderChart";
import { yearlyGenderRatio } from "@/mock-data/genderRatio";
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";

const GenderAnalytics: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedYearAnalytics, setSelectedYearAnalytics] =
    useState<YearlyGenderRatio>({
      year: currentYear,
      female_percentage: 0,
      male_percentage: 0,
      children_percentage: 0,
    });
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
    const filteredAnalytics = yearlyGenderRatio.find((item) => {
      return item.year.toString() === selectedYear;
    });

    if (filteredAnalytics) {
      setSelectedYearAnalytics(filteredAnalytics);
    } else {
      setSelectedYearAnalytics({
        year: currentYear,
        female_percentage: 0,
        male_percentage: 0,
        children_percentage: 0,
      });
    }
    setLoading(false);
  }, [selectedYear]);

  return (
    <div className={styles.genderAnalyticsContainer}>
      <div className={styles.titleBox}>
        <h2>Gender</h2>
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
      <div className={styles.chartContainer}>
        <GenderChart selectedYearAnalytics={selectedYearAnalytics} />
      </div>
    </div>
  );
};

export default GenderAnalytics;
