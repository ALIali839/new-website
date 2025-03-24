import { useState } from "react";
import axios from "axios";
import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [userType, setUserType] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize router


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        name,
        email,
        userType,
      });
  
      setMessage(`✅ Success: ${response.data.message}`);
  
      // Delay navigation by 1 second
      setTimeout(() => {
        router.push("/home");
      }, 1000);
  
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || "Login failed"}`);
    }
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {userType === "staff" ? "Staff Login" : "Customer Login"}
      </h2>

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${userType === "customer" ? styles.active : ""}`}
          onClick={() => setUserType("customer")}
        >
          Customer
        </button>
        <button
          className={`${styles.button} ${userType === "staff" ? styles.active : ""}`}
          onClick={() => setUserType("staff")}
        >
          Staff
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.submitButton}>Login</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
