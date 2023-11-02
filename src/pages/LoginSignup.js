import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

function LoginSignup() {
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [selectedButton, setSelectedButton] = useState("signup");

  const showSignup = () => {
    setShowSignupForm(true);
    setSelectedButton("signup");
  };

  const showSignin = () => {
    setShowSignupForm(false);
    setSelectedButton("signin");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/users/register`, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Registration failed: Token not received");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed: Token not received");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="q-container">
      <div className="q-title">QUIZZIE</div>
      <div className="q-form-container">
        <div className="q-btn-group">
          <button
            onClick={showSignup}
            className={`btn-signup ${
              selectedButton === "signup" && "selected"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={showSignin}
            className={`btn-signin ${
              selectedButton === "signin" && "selected"
            }`}
          >
            Log In
          </button>
        </div>

        {showSignupForm ? (
          <div className="form-container">
            <div className="form">
              <form className="modal-form" onSubmit={handleRegister}>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button className="q-btn-signup" onClick={handleRegister}>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="form-container">
            <div className="form">
              <form className="modal-form" onSubmit={handleLogin}>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-col">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button className="q-btn-signup" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
