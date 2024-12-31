import { AddPrescriptionsModalProps, Medication } from "@/types/types";
import styles from "./AddPrescriptionsModal.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";

const AddPrescriptionsModal: React.FC<AddPrescriptionsModalProps> = ({
  prescription,
  setPrescription,
}) => {
  const [formData, setFormData] = useState<Medication>({
    name: "",
    dosage: "",
    frequency: "",
    start_date: "",
    end_date: "",
    note: "",
  });
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | Date
      | null,
    fieldName?: string
  ) => {
    if (e instanceof Date && fieldName) {
      setFormData({
        ...formData,
        [fieldName]: moment(e).format("YYYY-MM-DD"),
      });
    } else if (e && "target" in e) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddMedication = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, dosage, frequency, start_date, end_date } = formData;
    if (name && dosage && frequency && start_date && end_date) {
      setPrescription({
        ...prescription,
        medications: [...prescription.medications, formData],
      });
      setFormData({
        name: "",
        dosage: "",
        frequency: "",
        start_date: "",
        end_date: "",
        note: "",
      });
    } else {
      toast.warn("Please fill in all the fields");
    }

    console.log(prescription);
  };

  const isDateAvaliable = (date: Date) => {
    if (moment(date).isAfter(moment(), "day")) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <form className={styles.medicationForm} onSubmit={handleAddMedication}>
      <div className={styles.infoBox}>
        <label htmlFor="name">Medication Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="dosage">Dosage:</label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
        />
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="frequency">Frequency:</label>
        <input
          type="text"
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        />
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="start_date">Start Date:</label>
        <div className={styles.dateInputs}>
          <div className={styles.datepickerContainer}>
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => {
                setSelectedStartDate(date);
                handleChange(date, "start_date");
              }}
              filterDate={isDateAvaliable}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              value={formData.start_date}
              className={styles.customDatepicker}
            />
          </div>
          <div className={styles.datepickerContainer}>
            <DatePicker
              selected={selectedEndDate}
              onChange={(date) => {
                setSelectedEndDate(date);
                handleChange(date, "end_date");
              }}
              filterDate={isDateAvaliable}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              value={formData.end_date}
              className={styles.customDatepicker}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.infoBox} ${styles.noteSection} `}>
        <label htmlFor="note">Note for medications:</label>
        <textarea
          rows={2}
          id="note"
          name="note"
          className={styles.noteInput}
          value={formData.note}
          onChange={handleChange}
        />
      </div>
      <div className={styles.button}>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default AddPrescriptionsModal;
