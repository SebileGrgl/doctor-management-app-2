"use client";
import Image from "next/image";
import styles from "./FilterModal.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ClickedOptions,
  DatesType,
  Frames,
  Patient,
  PatientsFilterModal,
  PatientsFilterParameters,
} from "@/types/types";
import moment from "moment";

import { patients } from "@/mock-data/patients";

const FilterModal: React.FC<PatientsFilterModal> = ({ setPatientsToShow }) => {
  const medicalConditions: string[] = [];
  patients.forEach((patient) => {
    const conditions = patient.medical_history;

    conditions.forEach((condition) => {
      if (!medicalConditions.includes(condition)) {
        medicalConditions.push(condition);
      }
    });
  });

  const [isToggled, setIsToggled] = useState<boolean>(false);
  const toggleFilterModal = () => {
    setIsToggled(!isToggled);
  };
  const [filterParameters, setFilterParameters] =
    useState<PatientsFilterParameters>({
      gender: [],
      disease: [],
      timeFrame: {
        frame: "",
        date: "",
      },
    });
  const [tempFilterParameters, setTempFilterParameters] =
    useState<PatientsFilterParameters>({
      gender: [],
      disease: [],
      timeFrame: {
        frame: "",
        date: "",
      },
    });
  const [isSelected, setIsSelected] = useState<ClickedOptions>({
    Male: false,
    Female: false,
    Daily: false,
    Monthly: false,
    Yearly: false,
    ...medicalConditions.reduce((acc, condition) => {
      acc[condition] = false;
      return acc;
    }, {} as Record<string, boolean>),
  });

  const currentDate = moment();
  const currentYear = currentDate.format("YYYY");
  const currentMonth = currentDate.format("YYYY-MM");
  const currentDay = currentDate.format("YYYY-MM-DD");

  const [dates, setDates] = useState<DatesType>({
    Daily: currentDay.toString(),
    Monthly: currentMonth.toString(),
    Yearly: currentYear.toString(),
  });

  const updateTimeFrame = (frame: Frames, date: string) => {
    setTempFilterParameters({
      ...tempFilterParameters,
      timeFrame: {
        frame,
        date,
      },
    });
  };

  const handleChangeDate = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
    updateTimeFrame(e.target.name as Frames, e.target.value);
  };

  const getYears = () => {
    const startYear = 2020;

    const years: number[] = [];

    for (let year = startYear; year <= Number(currentYear); year++) {
      years.push(year);
    }

    return years;
  };
  const yearsToFilter = getYears().reverse();

  useEffect(() => {
    const newIsSelected = {
      Male: tempFilterParameters.gender.includes("Male"),
      Female: tempFilterParameters.gender.includes("Female"),
      Daily: tempFilterParameters.timeFrame.frame === "Daily",
      Monthly: tempFilterParameters.timeFrame.frame === "Monthly",
      Yearly: tempFilterParameters.timeFrame.frame === "Yearly",
      ...medicalConditions.reduce((acc, condition) => {
        acc[condition] = tempFilterParameters.disease.includes(condition);
        return acc;
      }, {} as Record<string, boolean>),
    };
    setIsSelected(newIsSelected);
  }, [tempFilterParameters]);

  const selectedStyles = (item: string) => {
    const optionClassName =
      isSelected[item] === true ? styles.selectedOption : styles.option;

    return optionClassName;
  };

  const handleClick = (category: string, selectedOption: string | Frames) => {
    const isOptionSelected = !isSelected[selectedOption];
    if (category === "gender" || category === "disease") {
      setTempFilterParameters({
        ...tempFilterParameters,
        [category]: isOptionSelected
          ? [...(tempFilterParameters[category] || []), selectedOption]
          : (tempFilterParameters[category] || []).filter(
              (item) => item !== selectedOption
            ),
      });
    } else {
      if (isOptionSelected) {
        updateTimeFrame(
          selectedOption as Frames,
          dates[selectedOption as keyof DatesType]
        );
      } else {
        updateTimeFrame("Monthly", currentMonth.toString());
      }
    }
  };

  const applyBtnClick = () => {
    const { gender, disease, timeFrame } = filterParameters;
    const filteredPatientsToShow = patients.filter((patient) => {
      const isGenderMatched =
        gender.includes(patient.gender) || gender.length === 0;
      const matchedDiseases = disease.find((d) =>
        patient.medical_history.includes(d)
      );
      const isDiseaseMatched = matchedDiseases || disease.length === 0;
      let isTimeFrameMatched = patient.date_of_joining.includes(timeFrame.date);

      return isGenderMatched && isDiseaseMatched && isTimeFrameMatched;
    });
    setPatientsToShow(filteredPatientsToShow);
  };
  useEffect(() => {
    applyBtnClick();
  }, [filterParameters]);

  const closeModal = () => {
    setTempFilterParameters(filterParameters);
    toggleFilterModal();
  };
  return (
    <div className={styles.filterModalContainer}>
      <div className={styles.filterBtnContainer} onClick={toggleFilterModal}>
        <Image
          src="/filter-icon.svg"
          alt="filter-icon"
          width={24}
          height={24}
        />
        <div className={styles.filterIcon}>Filter</div>
      </div>
      <div
        className={`${styles.modalContainer} ${
          isToggled ? styles.toggledFilterBox : ""
        }`}
      >
        <div className={styles.modal}>
          <Image
            className={styles.closeIcon}
            src="/closeIcon.svg"
            alt="close-icon"
            width={26}
            height={26}
            onClick={closeModal}
          />

          <div className={styles.filterOptions}>
            <span>Gender:</span>
            <div className={styles.options}>
              <div
                onClick={() => {
                  handleClick("gender", "Male");
                }}
                className={selectedStyles("Male")}
              >
                Male
              </div>
              <div
                onClick={() => {
                  handleClick("gender", "Female");
                }}
                className={selectedStyles("Female")}
              >
                Female
              </div>
            </div>
          </div>
          <div className={styles.filterOptions}>
            <span>Diseases:</span>
            <div className={`${styles.options} ${styles.diseasesOptions}`}>
              {medicalConditions.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleClick("disease", item);
                    }}
                    className={selectedStyles(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.filterOptions}>
            <span>Time Frame:</span>
            <div className={styles.options}>
              {["Daily", "Monthly", "Yearly"].map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleClick("timeFrame", item);
                    }}
                    className={selectedStyles(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.timeOptions}>
            <div
              className={styles.date}
              style={{ display: !isSelected["Daily"] ? "none" : "flex" }}
            >
              <label htmlFor="Daily">Date:</label>
              <input
                type="date"
                id="Daily"
                name="Daily"
                value={dates["Daily"]}
                onChange={handleChangeDate}
              />
            </div>
            <div
              className={styles.month}
              style={{ display: !isSelected["Monthly"] ? "none" : "flex" }}
            >
              <label htmlFor="Monthly">Month:</label>
              <input
                type="month"
                id="Monthly"
                name="Monthly"
                value={dates["Monthly"]}
                onChange={handleChangeDate}
              />
            </div>
            <div
              className={styles.year}
              style={{ display: !isSelected["Yearly"] ? "none" : "flex" }}
            >
              <label htmlFor="Yearly">Year:</label>

              <select
                value={dates["Yearly"]}
                name="Yearly"
                id="Yearly"
                onChange={handleChangeDate}
              >
                {yearsToFilter.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className={styles.applyBtn}
            onClick={() => setFilterParameters(tempFilterParameters)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
