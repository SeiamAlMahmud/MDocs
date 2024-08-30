import React, { useState } from 'react'
import image from "/vite.svg"
import image2 from "../../assets/bg-001.jpg"
import Lottie from "lottie-react";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import lottieAni from "../../Lottie/authLottie.json"




const Authentication = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Username: "",
    Email: "",
    Phone: 880,
    Password: "",
    ConfirmPassword: ""
  })
  const [togglePass, setTogglePass] = useState(false)
  const [togglePassConfirm, setTogglePassConfirm] = useState(false)
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value})
  }
  console.log(userData)
  return (
    <>
      <div className="flex items-center justify-center flex-col  w-screen bg-[#F0F0F0]">
        <div className="flex items-center w-full flex-col-reverse md:flex-row md:justify-around bg-[#F0F0F0]  ">
          <div className="left flex  flex-col w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
            <img src={image} alt="Logo" className='h-20 bg-red-700 mt-10' />
            <form className='pl-3 mt-5'>
              <div>
                <div className='flex flex-col relative w-full'>
                  <label htmlFor="username" className='text-lg text-[#808080]'>username: </label>
                  <input type="text" id='username' name='Username' placeholder='Username' required onChange={onChangeHandler} value={userData.Username}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><FaUser /></i>
                </div>


                <div className='flex flex-col relative w-full'>
                  <label htmlFor="Name" className='text-lg text-[#808080]'>Name: </label>
                  <input type="text" id='Name' name='Name' placeholder='Name' required onChange={onChangeHandler} value={userData.Name} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-xl'><IoMdContact /></i>
                </div>

                <div className='flex flex-col relative w-full'>
                  <label htmlFor="Email" className='text-lg text-[#808080]'>Email: </label>
                  <input type="email" id='Email' name='Email' placeholder='Email' required onChange={onChangeHandler} value={userData.Email} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><MdEmail /></i>
                </div>

                <div className='flex flex-col relative w-full'>
                  <label htmlFor="Phone" className='text-lg text-[#808080]'>Phone: </label>
                  <input type="phone" id='Phone' name='Phone' placeholder='Phone' required onChange={onChangeHandler} value={userData.Phone} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><FaPhone /></i>
                </div>

                <div className='flex flex-col relative w-full my-3'>
                  <label htmlFor="Password" className='text-lg text-[#808080]'>Password: </label>
                  <input type={togglePass ? "text" : "password"} id='Password' name='Password' placeholder='Password' required onChange={onChangeHandler} value={userData.Password} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-3 right-2 text-lg cursor-pointer' onClick={() => setTogglePass(prev => !prev)}>{togglePass ? <IoEye /> : <IoEyeOffSharp />}</i>
                </div>

                <div className='flex flex-col relative w-full'>
                  <label htmlFor="ConfirmPassword" className='text-lg text-[#808080]'>ConfirmPassword: </label>
                  <input type={togglePassConfirm ? "text" : "password"} id='ConfirmPassword' name='ConfirmPassword' placeholder='ConfirmPassword' required onChange={onChangeHandler} value={userData.ConfirmPassword}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-3 right-2 text-lg cursor-pointer' onClick={() => setTogglePassConfirm(prev => !prev)}>{togglePassConfirm ? <IoEye /> : <IoEyeOffSharp />}</i>
                </div>
              </div>
              <p className='my-5 text-lg pl-5'>Aldready have An Account? <Link to={"/login"} className='text-pink-700'>Login</Link></p>
              <button className='w-full text-white font-semibold p-3 bg-green-500 rounded-xl transition-all mb-20'>Sign up</button>
            </form>
          </div>
          <div className="right hidden md:block w-[60%] md:mt-0 md:w-[35%] ">
           <Lottie loop={true} animationData={lottieAni}  />
          </div>
        </div>
      </div>
    </>
  )
}

export default Authentication