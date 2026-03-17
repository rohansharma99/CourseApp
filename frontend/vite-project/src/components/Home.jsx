// import React from 'react'
// import logo from '../assets/iron_manlogo.jpg'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { useEffect} from "react";
// import { useState } from 'react';
// import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
// import toast from 'react-hot-toast';
// import { BACKEND_URL } from '../../utils/utils';

// const Home = () => {
//      const [courses, setCourses] = useState([]);
//        const [isLoggedIn, setIsLoggedIn] = useState(false);
     
//        // token
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//     useEffect(()=>{
//         const fetchCourses =async () =>{
//             try {
//                 const response =await axios.get(
//                     `${BACKEND_URL}/Course/getAll`
//                 )
//                 console.log(response)
//                 // backend structure ke according adjust karna
//            setCourses(response.data.courses || response.data);
//          } catch (error) {
//           console.log("error in fetchCourses", error);
//           }
           
//         }
//          fetchCourses();
//     },[])
    

//   // logout
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/User/logout`, {
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       localStorage.removeItem("user");
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.log("Error in logging out ", error);
//       toast.error(error.response.data.errors || "Error in logging out");
//     }
//   };
   


//   return (
//       <div className='bg-linear-to-r from-sky-300 to-sky-500 min-h-screen text-white'>
//       <div className='  container mx-auto p-4 my-auto'>
//         {/* Header */}
//         <header className='flex justify-between '>
//             <div className='flex items-center space-x-2'>
//                 <img src={logo} alt="" className='w-10 h-10 rounded-full ' />
//                 <h1 className='text-2xl text-blue-950 font-bold'>TechMorph</h1>
//             </div>
//             <div className='flex items-center space-x-4'>
    
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
//               >
//                 Logout
//               </button>):(<>
//                <Link to={"/login"}
//                  className='bg-blue-500 text-white py-2 px-2  border-white rounded-md hover:scale-115 duration-400'>
//                     Login  
//                 </Link>
//                 <Link to={"/signup"} className='bg-green-500 text-white py-2 px-1  border-white rounded-md ml-2 hover:scale-115 duration-400'>
//                     Sign Up
//                 </Link></>
//                 )}
               

//             </div>
//         </header >
//         {/* Main Content */}
//         <section className='text-center py-25'>
//             <h1 className='text-4xl font-semibold text-blue-950'>TechMorph</h1>
//                 <p className='py-3 font-bold'>Welcome to TechMorph, your gateway to the world of technology! .</p>
//                 <Link to={'/getAll'} className='bg-emerald-800 rounded  text-white font-semibold hover:bg-emerald-400 duration-300 hover:text-black py-3 px-4'>Explore Courses</Link>
//                 <button className='bg-white rounded  text-black font-semibold hover:bg-emerald-800 duration-300 hover:text-white py-3 px-4 ml-2' >Courses videos</button>
//         </section>
//         <section className="py-25">
//   <h2 className="text-3xl font-bold text-center text-blue-950 mb-10">  {/*also use react slick*/}
//     Our Courses
//   </h2>

//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
//     {courses.map((courses) => (
//       <div
//         key={courses._id}
//         className="bg-white text-black rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
//       >
        
//         {/* Course Image */}
//         <img
//           src={courses.image.url}
//           alt={courses.title}
//           className="w-full h-40 object-cover"
//         />

//         {/* Course Content */}
//         <div className="p-4">
//           <h3 className="text-lg font-bold">{courses.title}</h3>

//           <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//             {courses.description}
//           </p>

//           <div className="flex justify-between items-center mt-4">
//             <span className="font-semibold text-blue-600">
//               ₹{courses.price}
//             </span>

//             <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800">
//               Enrol Now
//             </button>
//           </div>
//         </div>
//       </div>
//      ))}

//       </div>
//    </section>
       
//         {/* Footer */}
//         <footer>
//         <div className='grid grid-cols-1 md:grid-cols-3 text-1xl'><div className='flex flex-col items-center md:items-start'>
//             <div className='flex items-center space-x-2'>
//                 <img src={logo} alt="" className='w-10 h-10 rounded-full ' />
//                 <h1 className='text-2xl text-blue-950 font-bold'>TechMorph</h1>
//             </div>
            
//              <div className="mt-3 ml-2 md:ml-8">
//                 <p className="mb-2">Follow us</p>
//                 <div className="flex space-x-4">
//                   <a href="">
//                     <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
//                   </a>
//                   <a href="">
//                     <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
//                   </a>
//                   <a href="">
//                     <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="items-center mt-6 md:mt-0 flex flex-col">
//               <h3 className="text-lg font-semibold md:mb-4">connects</h3>
//               <ul className=" space-y-2 text-gray-700">
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   portfolio- techMorph
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Leetcode- techMorph
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Github- techMorph
//                 </li>
//               </ul>
//             </div>
//             <div className="items-center mt-6 md:mt-0 flex flex-col">
//               <h3 className="text-lg font-semibold mb-4">
//                 copyrights &#169; 2024
//               </h3>
//               <ul className=" space-y-2 text-center text-gray-700">
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Terms & Conditions
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Privacy Policy
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Refund & Cancellation
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </footer>

//       </div>
//       </div>
   
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react'
import logo from '../assets/iron_manlogo.jpg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaCode } from 'react-icons/fa'
import { MdOutlineSchool, MdOutlinePlayCircle, MdOutlineStars } from 'react-icons/md'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/utils'

const QUOTES = [
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X",
  },
  {
    text: "The more that you read, the more things you will know.",
    author: "Dr. Seuss",
  },
]

const STATS = [
  { label: "Students Enrolled", value: "12,400+" },
  { label: "Courses Available", value: "180+" },
  { label: "Expert Instructors", value: "60+" },
  { label: "Satisfaction Rate", value: "98%" },
]

const Home = () => {
  const [courses, setCourses] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Auth check
  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/Course/getAll`)
        setCourses(response.data.courses || response.data)
      } catch (error) {
        console.log('error in fetchCourses', error)
      }
    }
    fetchCourses()
  }, [])

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/User/logout`, {
        withCredentials: true,
      })
      toast.success(response.data.message)
      localStorage.removeItem('user')
      setIsLoggedIn(false)
      navigate('/')
    } catch (error) {
      console.log('Error in logging out ', error)
      toast.error(error?.response?.data?.errors || 'Error in logging out')
    }
  }

  return (
    <div className="home-root">

      {/* ===== NAVBAR ===== */}
      <nav className={`home-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo-wrap">
              <img src={logo} alt="TechMorph" className="navbar-logo" />
            </div>
            <span className="navbar-brand-name">TechMorph</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#quote">Inspiration</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>

          {/* Auth Buttons */}
          <div className="navbar-auth">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-nav-login">Login</Link>
                <Link to="/signup" className="btn-nav-signup">Sign Up</Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'ham-open' : ''} />
            <span className={menuOpen ? 'ham-open' : ''} />
            <span className={menuOpen ? 'ham-open' : ''} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#quote" onClick={() => setMenuOpen(false)}>Inspiration</a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false) }}>Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-bg-decor" />
        <div className="hero-content">
          <div className="hero-badge">
            <MdOutlineStars />
            <span>Trusted by 12,000+ students</span>
          </div>
          <h1 className="hero-headline">
            Learn. Build.<br />
            <span className="hero-highlight">Transform.</span>
          </h1>
          <p className="hero-subtext">
            TechMorph brings world-class technology education right to your screen.
            Structured courses, real projects, expert mentors.
          </p>
          <div className="hero-cta">
            <Link to="/getAll" className="btn-primary">
              <MdOutlineSchool />
              Explore Courses
            </Link>
            <button className="btn-secondary">
              <MdOutlinePlayCircle />
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="hero-card-float card-1">
            <span className="card-dot dot-green" />
            <span>React Development</span>
          </div>
          <div className="hero-card-float card-2">
            <span className="card-dot dot-blue" />
            <span>Full Stack MERN</span>
          </div>
          <div className="hero-card-float card-3">
            <span className="card-dot dot-orange" />
            <span>Data Structures</span>
          </div>
          <div className="hero-circle-bg" />
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="stats-strip">
        {STATS.map((stat, i) => (
          <div key={i} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ===== INSPIRATIONAL QUOTE ===== */}
      <section className="quote-section" id="quote">
        <div className="quote-inner">
          <div className="quote-mark">"</div>
          <p className="quote-text" key={quoteIndex}>
            {QUOTES[quoteIndex].text}
          </p>
          <span className="quote-author">— {QUOTES[quoteIndex].author}</span>
          <div className="quote-dots">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                className={`qdot ${i === quoteIndex ? 'qdot-active' : ''}`}
                onClick={() => setQuoteIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section className="courses-section" id="courses">
        <div className="section-header">
          <span className="section-badge">Featured</span>
          <h2 className="section-title">Our Top Courses</h2>
          <p className="section-subtitle">
            Carefully crafted courses by industry professionals to level up your skills
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="courses-empty">
            <div className="skeleton-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="course-skeleton">
                  <div className="skel-img" />
                  <div className="skel-line skel-long" />
                  <div className="skel-line skel-short" />
                  <div className="skel-line skel-med" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-img-wrap">
                  <img
                    src={course.image?.url}
                    alt={course.title}
                    className="course-img"
                  />
                  <div className="course-img-overlay" />
                  <span className="course-badge-tag">Course</span>
                </div>
                <div className="course-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-footer">
                    <span className="course-price">Rs. {course.price}</span>
                    <button className="btn-enroll">Enroll Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="courses-viewall">
          <Link to="/getAll" className="btn-viewall">View All Courses</Link>
        </div>
      </section>

      {/* ===== ABOUT STRIP ===== */}
      <section className="about-section" id="about">
        <div className="about-text">
          <span className="section-badge">Who We Are</span>
          <h2 className="section-title">Built for learners,<br />by builders.</h2>
          <p>
            TechMorph was founded with a mission to democratize technology education.
            We believe everyone deserves access to high-quality, structured learning
            paths that bridge the gap between theory and real-world skills.
          </p>
          <p>
            From beginner-friendly fundamentals to advanced system design, our
            curriculum is always evolving with the industry.
          </p>
          <Link to="/getAll" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.2rem' }}>
            Start Learning Today
          </Link>
        </div>
        <div className="about-visual">
          <div className="about-card ac-1">
            <MdOutlineSchool size={28} />
            <span>Structured Curriculum</span>
          </div>
          <div className="about-card ac-2">
            <FaCode size={24} />
            <span>Project-Based Learning</span>
          </div>
          <div className="about-card ac-3">
            <MdOutlineStars size={26} />
            <span>Expert Mentors</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="home-footer" id="footer">
        <div className="footer-inner">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="footer-brand">
              <img src={logo} alt="TechMorph" className="footer-logo" />
              <span>TechMorph</span>
            </div>
            <p className="footer-desc">
              Empowering the next generation of tech professionals through
              accessible, high-quality education.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/getAll">All Courses</Link></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#quote">Blog</a></li>
              <li><a href="#footer">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Portfolio - TechMorph</a></li>
              <li><a href="#">LeetCode - TechMorph</a></li>
              <li><a href="#">GitHub - TechMorph</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund &amp; Cancellation</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright &copy; 2024 TechMorph. All rights reserved.</span>
          <span>Made with passion for learners.</span>
        </div>
      </footer>

    </div>
  )
}

export default Home