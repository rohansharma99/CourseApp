import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/iron_manlogo.jpg'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="welcome-root">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="welcome-card">
        {/* Logo + Brand */}
        <div className="welcome-brand">
          <div className="welcome-logo-ring">
            <img src={logo} alt="TechMorph Logo" className="welcome-logo-img" />
          </div>
          <h1 className="welcome-brand-name">TechMorph</h1>
          <p className="welcome-tagline">Your gateway to the world of technology</p>
        </div>

        {/* Divider */}
        <div className="welcome-divider">
          <span>Who are you?</span>
        </div>

        {/* Role Cards */}
        <div className="welcome-roles">
          {/* User Card */}
          <button
            className="role-card role-user"
            onClick={() => navigate('/login?role=user')}
          >
            <div className="role-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="role-info">
              <span className="role-title">I am a Student</span>
              <span className="role-desc">Browse and enroll in courses</span>
            </div>
            <div className="role-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>

          {/* Admin Card */}
          <button
            className="role-card role-admin"
            onClick={() => navigate('/admin/login')}
          >
            <div className="role-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="role-info">
              <span className="role-title">I am an Admin</span>
              <span className="role-desc">Manage courses and users</span>
            </div>
            <div className="role-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>

        <p className="welcome-footer-note">
          By continuing, you agree to TechMorph's
          <span className="welcome-link"> Terms of Service</span> and
          <span className="welcome-link"> Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

export default Welcome