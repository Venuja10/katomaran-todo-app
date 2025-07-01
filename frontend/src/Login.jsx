import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase"; // adjust path if needed

function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // ✅ Store token in localStorage
      localStorage.setItem("token", token);

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ Login failed:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔐 Login to Task Manager</h1>
      <button onClick={handleLogin} style={styles.button}>
        🔒 Sign in with Google
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "28px",
    marginBottom: "40px",
    color: "#333",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "6px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Login;
