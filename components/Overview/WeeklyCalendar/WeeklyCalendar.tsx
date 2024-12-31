import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays, format, isSameDay } from "date-fns";
import styles from "./WeeklyCalendar.module.scss";

const WeeklyCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  const weekStart = subDays(startDate, startDate.getDay());
  const weekEnd = addDays(weekStart, 6);
  const today = new Date();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h2>
          {format(weekStart, "dd")} - {format(weekEnd, "dd MMM, yyyy")}
        </h2>
        <div className={styles.buttons}>
          <button onClick={() => setStartDate(subDays(startDate, 7))}>
            {"<"}
          </button>
          <button onClick={() => setStartDate(addDays(startDate, 7))}>
            {">"}
          </button>
        </div>
      </div>
      <div className={styles.weekDays}>
        {[...Array(7)].map((_, index) => {
          const day = addDays(weekStart, index);
          const isToday = isSameDay(day, today);
          return (
            <div
              key={index}
              className={`${styles.day} ${isToday ? styles.selected : ""}`}
            >
              <div>{format(day, "E")}</div>
              <div>{format(day, "d")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
