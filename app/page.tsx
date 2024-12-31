"use client";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { Appointment, user } from "@/types/types";
import styles from "./page.module.scss";
import Analytics from "@/components/Overview/Analytics/Analytics";
import { appointments } from "@/mock-data/appointments";
import TodayAppointments from "@/components/Overview/TodayAppointments/TodayAppointments";
import PatientAnalytics from "@/components/Overview/PatientAnalytics/PatientAnalytics";
import GenderAnalytics from "@/components/Overview/GenderAnalytics/GenderAnalytics";
import WeeklyCalendar from "@/components/Overview/WeeklyCalendar/WeeklyCalendar";
import { useLoading } from "@/contexts/LoadingContext";

export default function Overview() {
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const { setLoading } = useLoading();

  let user;
  const userJson = localStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  }
  useEffect(() => {
    setAppointmentList(appointments);
    setLoading(false);
  }, []);

  return (
    <div>
      <div className={styles.welcomeTitle}>
        <h1>Welcome, {user.name}</h1>
        <p>Have a nice day at great work!</p>
      </div>
      <Analytics />
      <div className={styles.middleRow}>
        <div className={styles.leftColumn}>
          <TodayAppointments appointmentList={appointmentList} />
          <WeeklyCalendar />
        </div>
        <div className={styles.rightColumn}>
          <PatientAnalytics />
          <GenderAnalytics />
        </div>
      </div>
    </div>
  );
}
