import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [showSignupForm, setShowSignupForm] = useState(true); // Set one form as the initial active form

  const showSignup = () => setShowSignupForm(true);
  const showSignin = () => setShowSignupForm(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API call for user registration
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      // Handle the response
      if (response.data.token) {
        // Store the token in local storage or a secure location
        localStorage.setItem("userToken", response.data.token);

        // Redirect to the dashboard page
        navigate("/dashboard");
      } else {
        console.error("Registration failed: Token not received");
      }
    } catch (error) {
      // Handle registration error, e.g., show an error message
      console.error("Registration failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API call for user login
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // Handle the response
      if (response.data.token) {
        // Store the token in local storage or a secure location
        localStorage.setItem("userToken", response.data.token);

        // Redirect to the dashboard page
        navigate("/dashboard");
      } else {
        console.error("Login failed: Token not received");
      }
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error("Login failed", error);
    }
  };

  return (
    <div className="q-container">
      <div className="q-title">QUIZZIE</div>
      <div className="q-form-container">
        <div className="q-btn-group">
          <button onClick={showSignup} className="btn-signup">
            Sign Up
          </button>
          <button onClick={showSignin} className="btn-signin">
            Sign In
          </button>
        </div>

        {showSignupForm ? (
          <div className="form">
            <form className="modal-form" onSubmit={handleRegister}>
              <div className="q-form-input">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="q-form-input">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="q-form-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="q-form-input">
                <label>Confirm Password</label>
                <input
                  type="text"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="q-btn-signup" onClick={handleRegister}>
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div className="form">
            <form className="modal-form" onSubmit={handleLogin}>
              <div className="q-form-input">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="q-form-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="q-btn-signup" onClick={handleLogin}>
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
