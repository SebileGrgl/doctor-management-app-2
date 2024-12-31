"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./signup.module.scss";
import Link from "next/link";
import { SignupFormData } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    phoneNumber: "",
    eMail: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
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
    const { fullName, phoneNumber, eMail, password, confirmPassword } =
      formData;

    const isFormValid =
      fullName && phoneNumber && eMail && password && confirmPassword;

    if (!isFormValid) {
      toast.warn("Please fill in all the fields");
      return;
    }

    const isPasswordMatch = password === confirmPassword;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
    const isPasswordAvailable = passwordRegex.test(password);

    if (!isPasswordAvailable) {
      toast.warn(
        "Password must be minimum 6 characters, at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }

    if (!isPasswordMatch) {
      toast.warn("Passwords do not match");
      return;
    }

    if (isFormValid && isPasswordAvailable && isPasswordMatch) {
      console.log(formData);
    }
  };
  return (
    <div className={styles.signupFormContainer}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="logo" width={62} height={62} />
        <strong>Doct.</strong>
      </div>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => handleFormSubmit(e)} className={styles.signupForm}>
        <div className={`${styles.signupFullName} ${styles.signupInput}`}>
          <Image
            src="/person-icon.svg"
            alt="person-icon"
            width={26}
            height={26}
          />
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.signupPhoneNumber} ${styles.signupInput}`}>
          <Image
            src="/phone-icon.svg"
            alt="phone-icon"
            width={26}
            height={26}
          />
          <input
            type="tel"
            placeholder="(XXX) XXX XXXX"
            maxLength={18}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.signupEmail} ${styles.signupInput}`}>
          <Image src="/mail-icon.svg" alt="mail-icon" width={26} height={26} />
          <input
            type="email"
            placeholder="E-mail"
            name="eMail"
            value={formData.eMail}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.signupPassword} ${styles.signupInput}`}>
          <Image src="/lock-icon.svg" alt="lock-icon" width={26} height={26} />
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Image
            src={passwordVisibility ? "/visibility.svg" : "/visibility-off.svg"}
            alt="toggle password visibility"
            width={26}
            height={26}
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div
          className={`${styles.signupConfirmPassword} ${styles.signupInput}`}
        >
          <Image src="/lock-icon.svg" alt="lock-icon" width={26} height={26} />
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Signup" className={styles.signupBtn} />

        <Link className={styles.loginBtn} href="/auth/login">
          Login
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
