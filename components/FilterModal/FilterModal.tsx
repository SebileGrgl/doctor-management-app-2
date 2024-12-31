"use client";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./FilterModal.module.scss";
import {
  ClickedOptions,
  DatesType,
  FilterModalProps,
  AppointmentFilterParameters,
  Frames,
} from "@/types/types";
import Image from "next/image";
import moment from "moment";

const FilterModal: React.FC<FilterModalProps> = ({
  isToggled,
  toggleFilterModal,
  filterParameters,
  setFilterParameters,
}) => {
  const [isSelected, setIsSelected] = useState<ClickedOptions>({
    Pending: false,
    Completed: false,
    Cancelled: false,
    "Clinic Consulting": false,
    "Video Consulting": false,
    Daily: false,
    Monthly: false,
    Yearly: false,
  });

  const [tempFilterParameters, setTempFilterParameters] =
    useState<AppointmentFilterParameters>(filterParameters);

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
      Pending: tempFilterParameters.status.includes("Pending"),
      Completed: tempFilterParameters.status.includes("Completed"),
      Cancelled: tempFilterParameters.status.includes("Cancelled"),
      "Clinic Consulting":
        tempFilterParameters.consultationType.includes("Clinic Consulting"),
      "Video Consulting":
        tempFilterParameters.consultationType.includes("Video Consulting"),
      Daily: tempFilterParameters.timeFrame.frame === "Daily",
      Monthly: tempFilterParameters.timeFrame.frame === "Monthly",
      Yearly: tempFilterParameters.timeFrame.frame === "Yearly",
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
    if (category === "status" || category === "consultationType") {
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

  useEffect(() => {
    setTempFilterParameters(filterParameters);
  }, [filterParameters]);

  const closeModal = () => {
    toggleFilterModal();
    setTempFilterParameters(filterParameters);
  };
  return (
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
          <span>Status:</span>
          <div className={styles.options}>
            {["Pending", "Completed", "Cancelled"].map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleClick("status", item);
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
          <span>Consultation Type:</span>
          <div className={styles.options}>
            <div
              onClick={() => {
                handleClick("consultationType", "Clinic Consulting");
              }}
              className={selectedStyles("Clinic Consulting")}
            >
              Clinic Consultation
            </div>
            <div
              onClick={() => {
                handleClick("consultationType", "Video Consulting");
              }}
              className={selectedStyles("Video Consulting")}
            >
              Video Consultation
            </div>
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
          onClick={() => {
            setFilterParameters(tempFilterParameters);
            toggleFilterModal();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
