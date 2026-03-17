// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import logo from '../assets/iron_manlogo.jpg';
// import { BACKEND_URL } from "../../utils/utils";



// function Signup() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/User/signup`,
//         {
//           firstName,
//           lastName,
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Sugnup successful: ", response.data);
//       toast.success(response.data.message);
//       navigate("/login");
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.errors || "Signup failed!!!");
//       }
//     }
//   };

//   return (
//     <div className="bg-linear-to-r from-sky-500 to-blue-950 ">
//       <div className="h-screen container mx-auto flex  items-center justify-center text-white">
//         {/* Header */}
//         <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
//           <div className="flex items-center space-x-2">
//             <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
//             <Link to={"/"} className="text-xl font-bold text-orange-500">
//               TechMorph
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link
//               to={"/login"}
//               className="bg-transparent border border-gray-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
//             >
//               Login
//             </Link>
//             <Link
//               to={"/Courses"}
//               className="bg-orange-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
//             >
//               Join now
//             </Link>
//           </div>
//         </header>

//         {/* Signup Form */}
//         <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-125 m-8 md:m-0 mt-20">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Welcome to <span className="text-orange-500">TechMorph</span>
//           </h2>
//           <p className="text-center text-gray-400 mb-6">
//             Just Signup To Join Us!
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="firstname" className=" text-gray-400 mb-2">
//                 Firstname
//               </label>
//               <input
//                 type="text"
//                 id="firstname"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your firstname"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="lastname" className=" text-gray-400 mb-2">
//                 Lastname
//               </label>
//               <input
//                 type="text"
//                 id="lastname"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your lastname"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className=" text-gray-400 mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="name@email.com"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className=" text-gray-400 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="********"
//                   required
//                 />
//                 <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
//                   👁️
//                 </span>
//               </div>
//             </div>
//             {errorMessage && (
//               <div className="mb-4 text-red-500 text-center">
//                 {errorMessage}
//               </div>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
//             >
//               Signup
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../assets/iron_manlogo.jpg';
import { BACKEND_URL } from "../../utils/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/User/signup`,
        {
          firstName,
          lastName,
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
      console.log("Signup successful: ", response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed!!!");
        toast.error(error.response.data.errors || "Signup failed!!!");
      } else {
        toast.error("Signup failed!!!");
      }
    }
  };

  return (
    <div className="signup-root">
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
            <Link to="/login" className="auth-link-btn">
              Sign In
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
              <span className="auth-icon-badge">🚀</span>
            </div>
            <h1 className="auth-title">Join TechMorph</h1>
            <p className="auth-subtitle">Start your learning journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name Row */}
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <div className="form-input-wrap">
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-input"
                    placeholder="John"
                    required
                  />
                  <span className="form-icon">👤</span>
                </div>
              </div>

              <div className="form-group form-group-half">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <div className="form-input-wrap">
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                    placeholder="Doe"
                    required
                  />
                  <span className="form-icon">👤</span>
                </div>
              </div>
            </div>

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

            {/* Terms */}
            <label className="form-checkbox">
              <input type="checkbox" required />
              <span>
                I agree to the{" "}
                <Link to="#" className="form-link">
                  Terms of Service
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button type="submit" className="form-submit-btn">
              Create Account
              <span className="btn-arrow">→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          {/* Login Link */}
          <Link to="/login" className="auth-switch-btn">
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
