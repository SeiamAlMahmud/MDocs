import React from 'react'
import { FaDochub } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt'


const HeroSection = () => {

    const navigate = useNavigate()
  return (
    <div className='bg-[#090917] text-white '>
    <h1 className='text-center text-6xl lg:text-8xl pt-20  px-5 font-extrabold items-center flex justify-center flex-col'> <span>Make your Documents. </span> <br /> <span> </span> The best it can be with MDocs.
    </h1>
    <h3 className='mt-16 mx-10 sm:mx-20 text-center text-xl md:text-4xl pb-20 sm:pb-24 font-extralight'>
    Build & share your Documents,  users love with MDocs, a platform designed to support you throughout your Writting journey. Backed by AlMahmud and trusted by millions of Writter & Blogger around the world. </h3>
  <div className='flex justify-center items-center pb-16 text-xl'>
   <Tilt>
    <button
    onClick={()=> navigate("/doc")}
    className='border-[#fcc419] mr-8 border-2 px-3 py-2 rounded-full transition-all hover:bg-[#fcc419] hover:text-black font-bold'>Get Started</button></Tilt>
    <button
    onClick={()=> navigate("/demoDoc")}
    className='flex gap-2 items-center hover:underline hover:text-[#fcc419] font-bold '>Try Demo <i><IoIosLogOut /> </i></button>
  </div>
  </div>
  )
}

export default HeroSection