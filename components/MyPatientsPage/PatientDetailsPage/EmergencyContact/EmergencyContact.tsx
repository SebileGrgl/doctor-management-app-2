"use client";
import { ContactFormData, selectedPatientProp } from "@/types/types";
import styles from "./EmergencyContact.module.scss";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmergencyContact: React.FC<selectedPatientProp> = ({
  selectedPatient,
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    relationship: "",
    phone: "",
  });
  const contactProfiles = selectedPatient.emergency_contact;

  const toggleNewContactModal = () => {
    isToggled &&
      setFormData({
        name: "",
        relationship: "",
        phone: "",
      });
    setIsToggled(!isToggled);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const input = value.replace(/\D/g, "");
      let formattedInput = input;

      if (input.length > 3) {
        formattedInput = `(${input.substring(0, 3)}) ${input.substring(3, 6)}`;
      }
      if (input.length > 6) {
        formattedInput = `(${input.substring(0, 3)}) ${input.substring(
          3,
          6
        )} ${input.substring(6, 10)}`;
      }

      setFormData({
        ...formData,
        [name]: formattedInput,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, relationship, phone } = formData;

    const isFormValid = name && relationship && phone;

    if (!isFormValid) {
      toast.warn("Please fill in all the fields");
      return;
    } else {
      console.log(formData);
      toggleNewContactModal();
      toast.success("New contact created successfully!");
    }
  };

  return (
    <div className={styles.emergencyContactSection}>
      <ToastContainer />
      <div className={styles.titleContainer}>
        <h3>Emergency Contact</h3>
        <div className={styles.addBtnContainer} onClick={toggleNewContactModal}>
          <Image src="/add-icon.svg" alt="add-icon" width={24} height={24} />
        </div>
      </div>
      <div className={styles.borderContainer}>
        {contactProfiles.map((profile) => {
          return (
            <div className={styles.contactInformations} key={profile.phone}>
              <div>
                <span>Name:</span>
                <p>{profile.name}</p>
              </div>
              <div>
                <span>Relationship:</span>
                <p>{profile.relationship}</p>
              </div>
              <div>
                <span>Phone:</span>
                <p>{profile.phone}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isToggled && (
        <div className={styles.overlayContainer}>
          <Image
            className={styles.closeIcon}
            onClick={toggleNewContactModal}
            src="/close-icon.svg"
            alt="close-icon"
            width={30}
            height={30}
          />
          <div className={styles.modalContainer}>
            <h3>New Contact</h3>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <div className={styles.infoBox}>
                <label htmlFor="name">Name:</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.infoBox}>
                <label htmlFor="relationship">Relationship:</label>
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.infoBox}>
                <label htmlFor="phone">Phone:</label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder="(XXX) XXX XXXX"
                  maxLength={18}
                  minLength={18}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.cancelBtn}
                  onClick={toggleNewContactModal}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Create"
                  className={styles.createBtn}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContact;
