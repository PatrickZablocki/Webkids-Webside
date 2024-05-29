import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          birthdate,
          password,
        }),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginWithGoogle = () => {
    console.log("Anmeldung mit Google");
  };

  const handleLoginWithApple = () => {
    console.log("Anmeldung mit Apple");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.Register_container}>
      <Link to="/navbar" className={styles.logoLink}>
        <img
          src="/Logo/Logo_Webkids1.webp"
          alt="Logo"
          className={styles.logo}
        />
      </Link>
      <div className={styles.Register_box}>
        <div className={styles.Register_image}></div>
        <div className={styles.Register_content}>
          <h1>Registrieren</h1>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label>Geburtsdatum:</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
            <div className={styles.passwordContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className={styles.eyeIcon}
              />
            </div>
            <button type="submit">Registrieren</button>
          </form>
          <hr />
          <div className={styles.Register_Social}>
            <button
              className={styles.google_button}
              onClick={handleLoginWithGoogle}
            >
              <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
              Mit Google registrieren
            </button>
            <button
              className={styles.apple_button}
              onClick={handleLoginWithApple}
            >
              <FontAwesomeIcon icon={faApple} className={styles.icon} />
              Mit Apple registrieren
            </button>
          </div>
          <hr />
          <div className={styles.Register_toRegister}>
            <p>
              Du besitzt bereits einen Account?{" "}
              <Link to="/login">Anmelden</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
