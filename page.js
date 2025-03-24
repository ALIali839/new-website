"use client";
import LoginForm from "../../components/loginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      {/* Overlay for better readability */}
      <div className={styles.overlay}></div>

      {/* Login Form */}
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
