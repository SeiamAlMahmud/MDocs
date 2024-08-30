import React, { useState } from 'react'
import image from "/vite.svg"
import image2 from "../../assets/bg-001.jpg"
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';





const Login = () => {
  const [userData, setUserData] = useState({
    Username: "",
    Email: "", 
    Password: "",
  })
  const [togglePass, setTogglePass] = useState(false)
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value})
  }
  console.log(userData)
  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen w-screen bg-[#F0F0F0]">
        <div className="flex items-center w-full bg-[#F0F0F0] mt-52 justify-center">
          <div className="left flex  flex-col w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] mx-auto">
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
                  <label htmlFor="Email" className='text-lg text-[#808080]'>Email: </label>
                  <input type="email" id='Email' name='Email' placeholder='Email' required onChange={onChangeHandler} value={userData.Email} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><MdEmail /></i>
                </div>

               
                <div className='flex flex-col relative w-full my-3'>
                  <label htmlFor="Password" className='text-lg text-[#808080]'>Password: </label>
                  <input type={togglePass ? "text" : "password"} id='Password' name='Password' placeholder='Password' required onChange={onChangeHandler} value={userData.Password} 
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-3 right-2 text-lg cursor-pointer' onClick={() => setTogglePass(prev => !prev)}>{togglePass ? <IoEye /> : <IoEyeOffSharp />}</i>
                </div>

              
              </div>
              <p className='my-5 text-lg pl-5'>Don't have An Account? <Link to={"/register"} className='text-pink-700'>Sign up</Link></p>
              <button className='w-full text-white font-semibold p-3 bg-green-500 rounded-xl transition-all mb-20'>Sign In</button>
            </form>
          </div>
          {/* <div className="right">
            <img src={image2} className='h-[70%]' />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Login