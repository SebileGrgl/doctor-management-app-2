"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import { user as userType } from "@/types/types";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLoading } from "@/contexts/LoadingContext";

const Header: React.FC = () => {
  const [user, setUser] = useState<userType>({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePhoto: "",
    specialty: "",
  });
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);
  if (!user) {
    return <p>User not logged in.</p>;
  }

  const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  return (
    <div className={styles.sidebarContainer}>
      <div
        className={`${styles.sidebar} ${
          isSidebarToggled ? styles.toggledSidebar : ""
        }`}
      >
        <Image
          className={styles.closeIcon}
          src="/closeIcon.svg"
          alt="close-icon"
          width={26}
          height={26}
          onClick={toggleSidebar}
        />
        <Sidebar />
      </div>

      <div className={styles.headerContainer}>
        <Image
          src="/menu.svg"
          alt="menu-icon"
          width={34}
          height={34}
          onClick={toggleSidebar}
          className={styles.menuIcon}
        />

        <div className={styles.searchbar}>
          <Image
            className={styles.searchIcon}
            src="/search-icon.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
          <input
            type="search"
            placeholder="Search Appointment Patient or etc"
          />
        </div>

        <div className={styles.userInfoBox}>
          <img
            src={user.profilePhoto}
            alt="profile-photo"
            width={40}
            height={40}
          />
          <div className={styles.userInfoTitles}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.specialty}>{user.specialty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
