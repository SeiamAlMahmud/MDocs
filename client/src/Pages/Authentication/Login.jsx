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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import lottieAni from "../../Lottie/authLottie.json"
import toast from 'react-hot-toast';
import { fetchingURL } from '../../FetchURL/fetchingURL';
import axios from 'axios';
import { useDocContext } from '../../Context/DocContext';
import Loading from '../../Components/Loading/Loading';
import ScrollToTop from '../../Foundation/ScrollToTop';




const Login = () => {
  document.title = `Login`;
  ScrollToTop()


  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [togglePass, setTogglePass] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from || "/"
  // console.log(from)
  const { token, setToken, count, isVisible, setIsVisible, setResUsername,setCount,api, fetchDocs } = useDocContext()

  useEffect(() => {
   
    
    const timer = setTimeout(() => {
      if (count == 0) {
        setIsVisible(true);
      }
    }, 2400);
    setCount(prev => prev + 1)

    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    if (token) {
      navigate(from)
    }
  }, [token])
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  // console.log(userData)


  const onSubmitHandler = async (e) => {
    e.preventDefault();


    setLoading(true)
    try {

      if (!userData.username || !userData.email || !userData.password) {
        return toast.error("Please fill all the fields.")
      }


      const response = await api.post(`/users/login`, userData, {
        headers: {
            'Content-Type': 'application/json',  // Sending JSON data
        },
    });
    
      
      if (response?.data?.success) {
          console.log('Login successful');
          toast.success(response.data?.message);
          setToken(true)
          localStorage.setItem('token',response.data?.token)
          setResUsername(response?.data?.data?.username)
          fetchDocs()
          navigate(from)

        }
    } catch (error) {
      console.log(error?.response?.data)
      if (!error?.response?.data?.success) {
        console.log(error?.message || "An unexpected error occurred");
      }
      console.error('Login failed:', error.response.data);
    } finally {
      setLoading(false)
    }
  };


  return (
    <>
      {isVisible && !token ? (<div className="flex items-center justify-center flex-col   w-screen ">
        <div className="flex items-center w-full flex-col-reverse md:flex-row md:justify-around   ">
          <div className="left flex  flex-col w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
          <div className='flex gap-3 items-center justify-start mt-10'>
            <img src={image_1212} alt="Logo" className='h-20 w-20 ' />
            <h2 className='text-5xl text-black cursor-pointer  font-bold'>MDocs</h2>
            </div>
            <form className='pl-3 mt-5' onSubmit={onSubmitHandler}>
              <div>
                <div className='flex flex-col  w-full'>
                  <label htmlFor="username" className='text-lg text-[#808080]'>Username: </label>
                  <input type="text" id='username' name='username' placeholder='username' required onChange={onChangeHandler} value={userData.username}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                   <div className='relative'>
                  <i className='absolute bottom-3 left-2 text-lg'><FaUser /></i>
                  </div>
                </div>




                <div className='flex flex-col  w-full'>
                  <label htmlFor="email" className='text-lg text-[#808080]'>Email: </label>
                  <input type="email" id='email' name='email' placeholder='email' required onChange={onChangeHandler} value={userData.email}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                    <div className='relative'>
                  <i className='absolute bottom-3 left-2 text-lg'><MdEmail /></i>
                    </div>
                </div>



                <div className='flex flex-col  w-full my-3'>
                  <label htmlFor="password" className='text-lg text-[#808080]'>Password: </label>
                  <input type={togglePass ? "text" : "password"} id='password' name='password' placeholder='password' required onChange={onChangeHandler} value={userData.password}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />  <div className='relative'>
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-2 right-2 text-lg cursor-pointer p-1' onClick={() => setTogglePass(prev => !prev)}>{togglePass ? <IoEye /> : <IoEyeOffSharp />}</i>
                  </div>
                </div>


              </div>
              <p className='my-5 text-lg pl-5'>Don't have an account? <Link to={"/register"} className='text-pink-700'>Sign up</Link></p>
              <button className='w-full text-white font-semibold p-3 bg-green-500 rounded-xl transition-all mb-20 ' disabled={loading}>Sign In</button>
            </form>
          </div>
          <div className="right hidden md:block w-[60%] md:mt-0 md:w-[35%] ">
            <Lottie loop={true} animationData={lottieAni} />
          </div>
        </div>
      </div>) : <Loading />}
    </>
  )
}

export default Login