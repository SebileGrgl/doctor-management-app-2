"use client";
import styles from "./NewAppointmentModal.module.scss";
import { patients } from "@/mock-data/patients";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { appointments as appointmentList } from "@/mock-data/appointments";
import moment from "moment";
import {
  Appointment,
  NewAppointment,
  NewAppointmentModalProp,
} from "@/types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const NewAppointmentModal: React.FC<NewAppointmentModalProp> = ({
  setIsNewAppointmentModalOpen,
  createSuccess,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  let user;
  const userJson = localStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  }

  const [formInformations, setFormInformations] = useState<NewAppointment>({
    doctor_id: user.id,
    patient_id: "",
    date: "",
    time: "",
    reason: "",
    consultationType: "Clinic Consulting",
    status: "Pending",
    duration: 30,
  });

  const workingDays = [1, 2, 3, 4, 5];
  const workingHours = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  useEffect(() => {
    setAppointments(appointmentList);
  });

  const isDateAvaliable = (date: Date) => {
    const day = moment(date).day();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (!workingDays.includes(day)) {
      return false;
    } else if (moment(date).isBefore(moment(), "day")) {
      return false;
    }

    const bookedTimes = appointments
      .filter((appointment) => {
        return moment(appointment.date).isSame(formattedDate, "day");
      })
      .map((appointment) => appointment.time);

    const avaliableTimesForDay = workingHours.filter(
      (hour) => !bookedTimes.includes(hour)
    );

    return avaliableTimesForDay.length > 0;
  };

  useEffect(() => {
    if (selectedDate) {
      const day = moment(selectedDate).day();
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

      if (workingDays.includes(day)) {
        const bookedTimes = appointments
          .filter((appointment) => {
            return moment(appointment.date).isSame(formattedDate, "day");
          })
          .map((appointment) => appointment.time);

        const avaliableTimesForDay = workingHours
          .filter((hour) => !bookedTimes.includes(hour))
          .map((time) => moment(time, "HH:mm").format("hh:mm A"));
        setAvailableTimes(avaliableTimesForDay);
      }
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, appointments]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null,
    fieldName?: string
  ) => {
    if (e instanceof Date && fieldName) {
      setFormInformations({
        ...formInformations,
        [fieldName]: moment(e).format("YYYY-MM-DD"),
      });
    } else if (e && "target" in e) {
      const { name, value } = e.target;
      if (name === "patient") {
        const patientId = patients.find(
          (patient) => `${patient.first_name} ${patient.last_name}` === value
        )?.id;
        if (patientId) {
          setFormInformations({
            ...formInformations,
            patient_id: patientId,
          });
        }
      } else {
        setFormInformations({
          ...formInformations,
          [name]: value,
        });
      }
    }
  };

  const handleCreateAppointment = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { doctor_id, patient_id, date, time, reason } = formInformations;
    if (doctor_id && patient_id && date && time && reason) {
      try {
        console.log(formInformations);
        handleCloseModal();
        createSuccess();
      } catch {
        toast.error("There was an issue creating the appointment.");
      }
    } else {
      toast.warn("Please fill in all the fields");
    }
  };

  const handleCloseModal = () => {
    setIsNewAppointmentModalOpen(false);
  };
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.modalContainer}>
        <h1>New Appointment</h1>
        <form
          className={styles.newAppointmentForm}
          onSubmit={handleCreateAppointment}
        >
          <div className={styles.appointmentInfo}>
            <label htmlFor="patient">Patient:</label>
            <select name="patient" id="patient" onChange={handleChange}>
              {patients.map((patient) => (
                <option key={patient.id}>
                  {`${patient.first_name} ${patient.last_name}`}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.appointmentInfo}>
            <label htmlFor="reason">Reason:</label>
            <input
              type="text"
              id="reason"
              name="reason"
              onChange={handleChange}
            />
          </div>
          <div className={styles.appointmentInfo}>
            <label htmlFor="consultationType">Consultation Type:</label>
            <select
              name="consultationType"
              id="consultationType"
              onChange={handleChange}
            >
              <option>Clinic Consulting</option>
              <option>Video Consulting</option>
            </select>
          </div>
          <div className={styles.appointmentInfo}>
            <label htmlFor="date">Date:</label>
            <div className={styles.datepickerContainer}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  handleChange(date, "date");
                }}
                filterDate={isDateAvaliable}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                className={styles.customDatepicker}
              />
            </div>
          </div>
          <div className={styles.appointmentInfo}>
            {selectedDate && availableTimes.length > 0 && (
              <>
                <label htmlFor="time">Time:</label>
                <select
                  name="time"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => {
                    setSelectedTime(e.target.value);
                    handleChange(e);
                  }}
                >
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <input type="submit" value="Create" className={styles.createBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
