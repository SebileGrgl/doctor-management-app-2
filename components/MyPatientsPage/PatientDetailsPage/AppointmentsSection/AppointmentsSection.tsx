"use client";
import {
  Appointment,
  AppointmentFilterParameters,
  selectedPatientProp,
} from "@/types/types";
import styles from "./AppointmentsSection.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { appointments } from "@/mock-data/appointments";
import { users } from "@/mock-data/users";
import moment from "moment";
import FilterModal from "@/components/FilterModal/FilterModal";
import Link from "next/link";
import AppointmentDetails from "@/components/AppointmentsPage/AppointmentDetails/AppointmentDetails";

const AppointmentsSection: React.FC<selectedPatientProp> = ({
  selectedPatient,
}) => {
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [appointmentsToShow, setAppointmentsToShow] =
    useState<Appointment[]>(appointmentList);
  const [filterParameters, setFilterParameters] =
    useState<AppointmentFilterParameters>({
      status: [],
      consultationType: [],
      timeFrame: {
        frame: "",
        date: "",
      },
    });

  useEffect(() => {
    const findAppointments = appointments.filter(
      (appointment) => appointment.patient_id === selectedPatient.id
    );
    setAppointmentList(findAppointments);
  }, []);

  const toggleFilterModal = () => {
    setIsToggled(!isToggled);
  };

  const findDoctorName = (doctorId: string) => {
    const doctor = users.find((user) => user.id === doctorId);
    return doctor?.name;
  };

  const statusClassNames = {
    Completed: styles.completed,
    Cancelled: styles.cancelled,
    Pending: styles.pending,
  };

  const handleFilter = () => {
    const { status, consultationType, timeFrame } = filterParameters;

    const filteredAppointmentsToShow = appointmentList.filter((appointment) => {
      const isStatusMatched =
        status.length === 0 || status.includes(appointment.status);
      const isConsultationMatched =
        consultationType.includes(appointment.consultationType) ||
        consultationType.length === 0;
      let isTimeFrameMatched = appointment.date.includes(timeFrame.date);

      return isStatusMatched && isConsultationMatched && isTimeFrameMatched;
    });
    setAppointmentsToShow(filteredAppointmentsToShow);
  };
  useEffect(() => {
    handleFilter();
  }, [filterParameters, appointmentList]);

  const sortedAppointments = appointmentsToShow.sort(
    (a: Appointment, b: Appointment) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`);
      const dateTimeB = new Date(`${b.date} ${b.time}`);

      return dateTimeB.getTime() - dateTimeA.getTime();
    }
  );

  const openAppointmentModal = (appointment: Appointment) => {
    setAppointmentModal(true);
    setSelectedAppointment(appointment);
  };

  const closeAppointmentDetails = () => {
    setAppointmentModal(false);
  };

  return (
    <>
      <div className={styles.appointmentListContainer}>
        <div className={styles.titleContainer}>
          <h3>Appointments</h3>
          <div
            className={styles.filterBtnContainer}
            onClick={toggleFilterModal}
          >
            <Image
              src="/filter-icon.svg"
              alt="filter-icon"
              width={24}
              height={24}
            />
            <div className={styles.filterIcon}>Filter</div>
          </div>
        </div>
        <div className={styles.appointmentsTableContainer}>
          {sortedAppointments.length < 1 ? (
            <p className={styles.noAppointmentsTitle}>
              No appointments avaliable yet.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {sortedAppointments.map((appointment) => {
                  return (
                    <tr className={styles.appointmentRows} key={appointment.id}>
                      <td className={styles.patientInfo}>
                        <img
                          src={selectedPatient.profile_picture}
                          alt="patient-photo"
                        />

                        <div>{`${selectedPatient.first_name} ${selectedPatient.last_name}`}</div>
                      </td>
                      <td>{findDoctorName(appointment.doctor_id)}</td>
                      <td>{appointment.date}</td>
                      <td>{moment(appointment.date).format("dddd")}</td>

                      <td>{appointment.time}</td>
                      <td>
                        <span className={statusClassNames[appointment.status]}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className={styles.icons}>
                        {appointment.status === "Completed" ? (
                          <Link href={`/appointment/${appointment.id}`}>
                            <Image
                              className={styles.detailsBtn}
                              src="/visibility.svg"
                              alt="details-icon"
                              width={20}
                              height={20}
                            />
                          </Link>
                        ) : (
                          <Image
                            className={styles.detailsBtn}
                            src="/visibility.svg"
                            alt="details-icon"
                            width={20}
                            height={20}
                            onClick={() => openAppointmentModal(appointment)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <FilterModal
          isToggled={isToggled}
          toggleFilterModal={toggleFilterModal}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
        {appointmentModal && (
          <AppointmentDetails
            appointment={selectedAppointment}
            patient={selectedPatient}
            closeModal={closeAppointmentDetails}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentsSection;
