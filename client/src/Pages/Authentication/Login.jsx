import React, { useEffect, useState } from 'react'
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import lottieAni from "../../Lottie/authLottie.json"
import toast from 'react-hot-toast';
import { fetchingURL } from '../../FetchURL/fetchingURL';
import axios from 'axios';
import { useDocContext } from '../../Context/DocContext';
import Loading from '../../Components/Loading/Loading';




const Login = () => {
  document.title = `Login`;
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
  const { token, setToken, count, isVisible, setIsVisible, setResUsername } = useDocContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count == 0) {
        setIsVisible(true);
      }
    }, 1800);

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


      const response = await axios.post(`${fetchingURL}/users/login`, userData, { withCredentials: true });
      if (response.data.message) {
        console.log('Login successful');

        if (response?.data?.success) {
          toast.success(response.data?.message);
          setToken(true)
          setResUsername(response?.data?.data?.username)
          navigate(from)

        }
        // Redirect to dashboard or update UI
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        toast.success(error?.response?.data?.error || "An unexpected error occurred");
      }
      console.error('Login failed:', error.response.data);
    } finally {
      setLoading(false)
    }
  };


  return (
    <>
      {isVisible ? (<div className="flex items-center justify-center flex-col h-screen  w-screen bg-[#F0F0F0]">
        <div className="flex items-center w-full flex-col-reverse md:flex-row md:justify-around bg-[#F0F0F0]  ">
          <div className="left flex  flex-col w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
            <img src={image} alt="Logo" className='h-20 bg-red-700 mt-10' />
            <form className='pl-3 mt-5' onSubmit={onSubmitHandler}>
              <div>
                <div className='flex flex-col relative w-full'>
                  <label htmlFor="username" className='text-lg text-[#808080]'>Username: </label>
                  <input type="text" id='username' name='username' placeholder='username' required onChange={onChangeHandler} value={userData.username}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><FaUser /></i>
                </div>




                <div className='flex flex-col relative w-full'>
                  <label htmlFor="email" className='text-lg text-[#808080]'>Email: </label>
                  <input type="email" id='email' name='email' placeholder='email' required onChange={onChangeHandler} value={userData.email}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><MdEmail /></i>
                </div>



                <div className='flex flex-col relative w-full my-3'>
                  <label htmlFor="password" className='text-lg text-[#808080]'>Password: </label>
                  <input type={togglePass ? "text" : "password"} id='password' name='password' placeholder='password' required onChange={onChangeHandler} value={userData.password}
                    className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 pr-8 rounded-md mt-2 text-lg '
                  />
                  <i className='absolute bottom-3 left-2 text-lg'><RiLockPasswordFill /></i>
                  <i className='absolute bottom-3 right-2 text-lg cursor-pointer' onClick={() => setTogglePass(prev => !prev)}>{togglePass ? <IoEye /> : <IoEyeOffSharp />}</i>
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