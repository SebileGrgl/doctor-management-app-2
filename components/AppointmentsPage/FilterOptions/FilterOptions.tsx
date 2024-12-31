"use client";
import Image from "next/image";
import styles from "./FilterOptions.module.scss";
import { FilterOptionsProps, AppointmentFilterParameters } from "@/types/types";
import { useEffect, useState } from "react";
import FilterModal from "@/components/FilterModal/FilterModal";

const FilterOptions: React.FC<FilterOptionsProps> = ({
  appointments,
  setAppointmentsToShow,
  patients,
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterParameters, setFilterParameters] =
    useState<AppointmentFilterParameters>({
      status: [],
      consultationType: [],
      timeFrame: {
        frame: "",
        date: "",
      },
    });

  const toggleFilterModal = () => {
    setIsToggled(!isToggled);
  };

  const handleFilter = () => {
    const { status, consultationType, timeFrame } = filterParameters;

    const filteredPatients = patients.filter((patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const filteredPatientsIds = filteredPatients.map((patient) => patient.id);

    const filteredAppointmentsToShow = appointments.filter((appointment) => {
      const isPatientMatched =
        searchTerm === "" ||
        filteredPatientsIds.includes(appointment.patient_id);
      const isStatusMatched =
        status.length === 0 || status.includes(appointment.status);
      const isConsultationMatched =
        consultationType.includes(appointment.consultationType) ||
        consultationType.length === 0;
      let isTimeFrameMatched = appointment.date.includes(timeFrame.date);

      return (
        isPatientMatched &&
        isStatusMatched &&
        isConsultationMatched &&
        isTimeFrameMatched
      );
    });
    setAppointmentsToShow(filteredAppointmentsToShow);
  };

  useEffect(() => {
    handleFilter();
  }, [filterParameters, searchTerm]);
  return (
    <div className={styles.filterOptions}>
      <div className={styles.searchbarContainer}>
        <Image
          src="/search-icon.svg"
          alt="search-icon"
          width={24}
          height={24}
          className={styles.searchIcon}
        />
        <input
          type="search"
          placeholder="Enter a patient name"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className={styles.filterBtnContainer} onClick={toggleFilterModal}>
        <Image
          src="/filter-icon.svg"
          alt="filter-icon"
          width={24}
          height={24}
        />
        <div className={styles.filterIcon}>Filter</div>
      </div>
      <FilterModal
        isToggled={isToggled}
        toggleFilterModal={toggleFilterModal}
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default FilterOptions;
