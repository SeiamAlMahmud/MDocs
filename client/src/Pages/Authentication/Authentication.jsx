import React, { useEffect, useState } from 'react'
import image from "/vite.svg"
import image_1212 from "/1212.png";
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
import toast from "react-hot-toast"
import axios from 'axios';
import { fetchingURL } from '../../FetchURL/fetchingURL';
import { useDocContext } from '../../Context/DocContext';
import Loading from '../../Components/Loading/Loading';
import ScrollToTop from '../../Foundation/ScrollToTop';




const Authentication = () => {
  document.title = `Registration`;
  ScrollToTop()

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "+880",
    password: "",
    confirmPassword: ""
  })
  const [togglePass, setTogglePass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [togglePassConfirm, setTogglePassConfirm] = useState(false)
  const navigate = useNavigate()
  const { token, setToken, count, setCount, isVisible, setIsVisible, setResUsername,api, fetchDocs } = useDocContext()
  const now = new Date()


  useEffect(() => {
    const timer = setTimeout(() => {
      if (count == 0) {
        setIsVisible(true);
      }
    }, 1800);
    setCount(prev => prev + 1)
    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])


  useEffect(() => {
    const getDraftReg = JSON.parse(localStorage.getItem("draftReg"))
    if (getDraftReg && getDraftReg?.expire && now.getTime() > getDraftReg?.expire) {
      localStorage.removeItem('draftReg')
    }
    if (getDraftReg && now.getTime() < getDraftReg?.expire) {
      setUserData(getDraftReg)
    }
  }, [])


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Simple formatting: remove non-numeric characters except for '+'
    const formattedValue = name === 'phone' ? value.replace(/[^0-9+]/g, '') : value;

    const updatedUserData = { ...userData, [name]: formattedValue }
    setUserData(updatedUserData)



    updatedUserData.expire = now.getTime() + 1000 * 60 * 60 * 24;


    const draftReg = JSON.stringify(updatedUserData)
    localStorage.setItem("draftReg", draftReg)
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {

      if (!userData.name || !userData.username || !userData.email || !userData.phone || !userData.password || !userData.confirmPassword) {
        return toast.error("Please fill all the fields.")
      }

      if (userData.password !== userData.confirmPassword) {
        return toast.error("Passwords don't match.")
      }

      if (userData.password.length < 6  ) {
        return toast.error("Passwords must be at least 6 characters.")
      }

      if (userData.confirmPassword.length < 6) {
        return toast.error("Passwords must be at least 6 characters.")
      }

      const response = await api.post(`/users/register`, userData, {
        headers: {
            'Content-Type': 'application/json',  // Sending JSON data
        },
    });

      // console.log('kk', response)

      if (response?.data?.success) {
        toast.success(response.data?.message);
        localStorage.removeItem('draftReg');
        localStorage.setItem('token', response.data?.token)
        setToken(true)
        setResUsername(response?.data?.data?.username)
        fetchDocs()
        navigate("/")
      }
    } catch (error) {
      // console.log(error)
      if (!error?.response?.data?.success) {
        toast.success(error?.response?.data?.error || "An unexpected error occurred");
      }
      console.log(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false)
    }
  };


  // console.log(userData)
  return (
    <>
    {isVisible ? (<div className="flex items-center justify-center flex-col  w-screen overflow-hidden my-auto ">
        <div className="flex items-center w-full flex-col-reverse md:flex-row md:justify-around ">
          <div className="left flex  flex-col w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
            <div className='flex gap-3 items-center justify-start mt-10'>
            <img src={image_1212} alt="Logo" className='h-20 w-20 ' />
            <h2 className='text-5xl text-black cursor-pointer  font-bold'>MDocs</h2>
            </div>
            <form className='pl-3 mt-5' onSubmit={onSubmitHandler}>
              <div>
                <div className='flex flex-col  w-full'>
                  <label htmlFor="username" className='text-lg text-[#808080]'>Username: </label>
                  <input type="text" id='username' name='username' placeholder='Username' required onChange={onChangeHandler} value={userData.username}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                   <div className='relative'>
                  <i className='absolute bottom-[10px] left-2 text-xl'><FaUser /></i>
                  </div>
                </div>


                <div className='flex flex-col  w-full'>
                  <label htmlFor="name" className='text-lg text-[#808080]'>Name: </label>
                  <input type="text" id='name' name='name' placeholder='name' required onChange={onChangeHandler} value={userData.name}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <div className='relative'>
                  <i className='absolute bottom-[10px] left-2 text-xl'><IoMdContact /></i>
                  </div>
                </div>

                <div className='flex flex-col  w-full'>
                  <label htmlFor="email" className='text-lg text-[#808080]'>Email: </label>
                  <input type="email" id='email' name='email' placeholder='email' required onChange={onChangeHandler} value={userData.email}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <div className='relative'>
                  <i className='absolute bottom-[10px] left-2 text-xl'><MdEmail /></i>
                  </div>
                </div>

                <div className='flex flex-col  w-full'>
                  <label htmlFor="phone" className='text-lg text-[#808080]'>Phone: </label>
                  <input type="tel" id='phone' name='phone' placeholder='phone' required onChange={onChangeHandler} value={userData.phone}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <div className='relative'>
                  <i className='absolute bottom-[10px] left-2 text-xl'><FaPhone /></i>
                  </div>
                </div>

                <div className='flex flex-col  w-full my-3'>
                  <label htmlFor="password" className='text-lg text-[#808080]'>Password: </label>
                  <input type={togglePass ? "text" : "password"} id='password' name='password' placeholder='password' required onChange={onChangeHandler} value={userData.password}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                  <div className='relative'>
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-2 p-1 right-2 text-lg cursor-pointer' onClick={() => setTogglePass(prev => !prev)}>{togglePass ? <IoEye /> : <IoEyeOffSharp />}</i>
                  </div>
                </div>

                <div className='flex flex-col relative w-full'>
                  <label htmlFor="confirmPassword" className='text-lg text-[#808080]'>ConfirmPassword: </label>
                  <input type={togglePassConfirm ? "text" : "password"} id='confirmPassword' name='confirmPassword' placeholder='confirmPassword' required onChange={onChangeHandler} value={userData.confirmPassword}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                   <div className='relative'>
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-2 p-1 right-2 text-lg cursor-pointer' onClick={() => setTogglePassConfirm(prev => !prev)}>{togglePassConfirm ? <IoEye /> : <IoEyeOffSharp />}</i>
                  </div>
                </div>
              </div>
              <p className='my-5 text-lg pl-5'>Aldready have An Account? <Link to={"/login"} className='text-pink-700'>Login</Link></p>
              <button className='w-full text-white font-semibold p-3 bg-green-500 rounded-xl transition-all mb-20' disabled={loading}>Sign up</button>
            </form>
          </div>
            <Lottie loop={true} animationData={lottieAni} className='right hidden md:block w-[60%] md:mt-0 md:w-[35%] ' />
        </div>
      </div>) : <Loading />}
    </>
  )
}

export default Authentication