import React from 'react'
import logo from "/1212.png"
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (

        <>
            <div className='w-full bg-[#2e3440]'>
                <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 pt-9 items-start sm:gap-10 md:gap-14 lg:w-3/4 '>
                    <div className="Footer1 flex-col items-start flex gap-3">
                        <img src={logo} alt="logo" className='h-20' />
                        <p className='text-white text-5xl mb-5 font-bold'>MDocs</p>
                        <p className='text-lg text-white'>MDocs offers a cutting-edge document editing platform designed for seamless collaboration and intuitive use.  </p>
                        <div className='text-5xl flex gap-5 my-7'>
                            <i className='hover:text-white transition-all hover:backdrop-brightness-110 hover:scale-125'><FaFacebook /></i>
                            <i className='hover:text-white transition-all hover:backdrop-brightness-110 hover:scale-125'><FaLinkedin /></i>
                            <i className='hover:text-white transition-all hover:backdrop-brightness-110 hover:scale-125'><FaXTwitter /></i>
                        </div>
                    </div>
                    <div className="Footer2 mt-7 sm:mt-24 text-white">
                        <h1 className='text-4xl font-bold mb-7'>Company</h1>
                        <ul className='flex flex-col gap-2 cursor-pointer'>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Login</li>
                            <li>Privacy & Policy</li>
                        </ul>
                    </div>
                    <div className="Footer3 text-white mt-10 sm:mt-0  text-left flex flex-col g-2 lg:mt-24 ">
                        <h1 className='text-4xl font-semibold mb-3'>Contact us</h1>
                        <p>+9600924545400</p>
                        <p>contact@MDocs.com</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#2e3440] text-center  px-10 pt-14'>
                <p className='border-t-2 border-[#808080] py-5 text-[#808080]'>Copywrite {new Date().getFullYear()} @ Berniyes - All Right Reserved</p>
            </div>
        </>

    )
}

export default Footer