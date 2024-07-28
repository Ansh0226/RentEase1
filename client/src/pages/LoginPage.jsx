import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
// import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(
          setLogin({
            user: result.user,
            token: result.token,
          })
        );
        navigate("/");
      } else {
        setError(result.message); // Display error message from backend
      }
    } catch (err) {
      console.log("Login failed", err.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}{" "}
          {/* Display error message */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default LoginPage;
