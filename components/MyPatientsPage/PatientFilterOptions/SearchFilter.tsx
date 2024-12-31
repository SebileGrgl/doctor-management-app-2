import Image from "next/image";
import styles from "./SearchFilter.module.scss";
import { ChangeEvent } from "react";
import { SearchFilterProps } from "@/types/types";

const SearchFilter: React.FC<SearchFilterProps> = ({
  patients,
  setPatientsToShow,
}) => {
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredPatients = patients.filter((patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLocaleLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setPatientsToShow(filteredPatients);
  };

  return (
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
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchFilter;
