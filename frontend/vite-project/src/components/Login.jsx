// 

import React, { useState } from "react";
import logo from '../assets/iron_manlogo.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/User/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Login successful: ", response.data);
      toast.success(response.data.message);
      localStorage.setItem("user", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Login failed!!!");
        toast.error(error.response.data.errors || "Login failed!!!");
      } else {
        toast.error("Login failed!!!");
      }
    }
  };

  return (
    <div className="login-root">
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Header */}
      <header className="auth-header">
        <div className="auth-header-inner">
          <div className="auth-brand">
            <img src={logo} alt="TechMorph" className="auth-logo-img" />
            <Link to="/" className="auth-brand-name">TechMorph</Link>
          </div>
          <div className="auth-nav-links">
            <Link to="/signup" className="auth-link-btn">
              Create Account
            </Link>
            <Link to="/" className="auth-home-btn">
              Back Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="auth-container">
        <div className="auth-card">
          {/* Welcome Section */}
          <div className="auth-welcome">
            <div className="auth-icon-ring">
              <span className="auth-icon-badge">🔐</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Log in to your TechMorph account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="form-input-wrap">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="you@example.com"
                  required
                />
                <span className="form-icon">✉️</span>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="form-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="form-toggle-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="form-error">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="form-footer-options">
              <label className="form-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="form-forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="form-submit-btn">
              Sign In
              <span className="btn-arrow">→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>New to TechMorph?</span>
          </div>

          {/* Signup Link */}
          <Link to="/signup" className="auth-switch-btn">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;