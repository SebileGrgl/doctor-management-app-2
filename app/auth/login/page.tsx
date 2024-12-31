"use client";
import Image from "next/image";
import styles from "./login.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { LoginFormData } from "@/types/types";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { mockLogin } from "@/lib/mockLogin";

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    eMail: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const user = localStorage.getItem("user") === null ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(user);

  const router = useRouter();

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function handleRememberMe(e: ChangeEvent<HTMLInputElement>) {
    setRememberMe(e.target.checked);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      const rememberedEmail = localStorage.getItem("rememberedEmail");

      if (rememberedEmail) {
        setFormData((prev) => ({
          ...prev,
          eMail: rememberedEmail,
        }));
        setRememberMe(true);
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { eMail, password } = formData;
    if (!eMail || !password) {
      toast.warn("Please fill in all the fields");
      return;
    }

    const result = mockLogin(formData.eMail, formData.password);
    if (result.success) {
      localStorage.setItem("user", JSON.stringify(result.user));
      router.push("/");
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", eMail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      setIsLoggedIn(true);
    } else {
      toast.error(result.message);
    }
  };
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/auth/login");
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };
  const authenticatedUserView = (
    <div>
      <h1 className={styles.welcomeTitle}>
        Welcome Again <br /> User
      </h1>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="logo" width={62} height={62} />
        <strong>Doct.</strong>
      </div>
      {!isLoggedIn && <h1>Login</h1>}
      {isLoggedIn ? (
        authenticatedUserView
      ) : (
        <form onSubmit={handleLogin}>
          <div className={`${styles.loginEmail} ${styles.loginInput}`}>
            <Image
              src="/mail-icon.svg"
              alt="mail-icon"
              width={26}
              height={26}
            />
            <input
              type="email"
              placeholder="E-mail"
              name="eMail"
              value={formData.eMail}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.loginPassword} ${styles.loginInput}`}>
            <Image
              src="/lock-icon.svg"
              alt="lock-icon"
              width={26}
              height={26}
            />
            <input
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Image
              src={
                passwordVisibility ? "/visibility.svg" : "/visibility-off.svg"
              }
              alt="toggle password visibility"
              width={26}
              height={26}
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className={styles.rememberMe}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              Remember Me
            </label>
          </div>
          <input className={styles.loginBtn} type="submit" value="Login" />
          <div className={styles.signupDirection}>
            <p>Don't have an account?</p>

            <Link className={styles.signupBtn} href="/auth/signup">
              Sign Up
            </Link>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
