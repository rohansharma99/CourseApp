import React from 'react'
import logo from '../assets/iron_manlogo.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect} from "react";
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils/utils';

const Home = () => {
     const [courses, setCourses] = useState([]);
       const [isLoggedIn, setIsLoggedIn] = useState(false);
     
       // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

    useEffect(()=>{
        const fetchCourses =async () =>{
            try {
                const response =await axios.get(
                    `${BACKEND_URL}/Course/getAll`
                )
                console.log(response)
                // backend structure ke according adjust karna
           setCourses(response.data.courses || response.data);
         } catch (error) {
          console.log("error in fetchCourses", error);
          }
           
        }
         fetchCourses();
    },[])
    

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/User/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
   


  return (
      <div className='bg-linear-to-r from-sky-300 to-sky-500 min-h-screen text-white'>
      <div className='  container mx-auto p-4 my-auto'>
        {/* Header */}
        <header className='flex justify-between '>
            <div className='flex items-center space-x-2'>
                <img src={logo} alt="" className='w-10 h-10 rounded-full ' />
                <h1 className='text-2xl text-blue-950 font-bold'>TechMorph</h1>
            </div>
            <div className='flex items-center space-x-4'>
    
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>):(<>
               <Link to={"/login"}
                 className='bg-blue-500 text-white py-2 px-2  border-white rounded-md hover:scale-115 duration-400'>
                    Login  
                </Link>
                <Link to={"/signup"} className='bg-green-500 text-white py-2 px-1  border-white rounded-md ml-2 hover:scale-115 duration-400'>
                    Sign Up
                </Link></>
                )}
               

            </div>
        </header >
        {/* Main Content */}
        <section className='text-center py-25'>
            <h1 className='text-4xl font-semibold text-blue-950'>TechMorph</h1>
                <p className='py-3 font-bold'>Welcome to TechMorph, your gateway to the world of technology! .</p>
                <Link to={'/getAll'} className='bg-emerald-800 rounded  text-white font-semibold hover:bg-emerald-400 duration-300 hover:text-black py-3 px-4'>Explore Courses</Link>
                <button className='bg-white rounded  text-black font-semibold hover:bg-emerald-800 duration-300 hover:text-white py-3 px-4 ml-2' >Courses videos</button>
        </section>
        <section className="py-25">
  <h2 className="text-3xl font-bold text-center text-blue-950 mb-10">  {/*also use react slick*/}
    Our Courses
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
    {courses.map((courses) => (
      <div
        key={courses._id}
        className="bg-white text-black rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
      >
        
        {/* Course Image */}
        <img
          src={courses.image.url}
          alt={courses.title}
          className="w-full h-40 object-cover"
        />

        {/* Course Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold">{courses.title}</h3>

          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {courses.description}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-blue-600">
              ₹{courses.price}
            </span>

            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800">
              Enrol Now
            </button>
          </div>
        </div>
      </div>
     ))}

      </div>
   </section>
       
        {/* Footer */}
        <footer>
        <div className='grid grid-cols-1 md:grid-cols-3 text-1xl'><div className='flex flex-col items-center md:items-start'>
            <div className='flex items-center space-x-2'>
                <img src={logo} alt="" className='w-10 h-10 rounded-full ' />
                <h1 className='text-2xl text-blue-950 font-bold'>TechMorph</h1>
            </div>
            
             <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-gray-700">
                <li className="hover:text-white cursor-pointer duration-300">
                  portfolio- techMorph
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Leetcode- techMorph
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github- techMorph
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyrights &#169; 2024
              </h3>
              <ul className=" space-y-2 text-center text-gray-700">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
      </div>
   
  )
}

export default Home
