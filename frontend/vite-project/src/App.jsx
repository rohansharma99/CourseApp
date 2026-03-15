import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Courses from './components/Courses'
import Buy from './components/Buy'
import Purchases from './components/Purchase'
import Signup from './components/Singup'
import AdminSignup from './admin/AdminSingup'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import CourseCreate from './admin/CourseCreate'
import UpdateCourse from './admin/UpdateCourses'
import OurCourses from './admin/OurCourses'
function App() {
   const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/getAll" element={<Courses/>}/>
          <Route path="/buy/:courseId" element={<Buy/>}/>
          <Route path="/purchases" element={<Purchases/>}/>

            {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
        />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/our-courses" element={<OurCourses />} />
    
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App
