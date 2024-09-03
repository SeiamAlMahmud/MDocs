import React, { useState } from 'react'
import image_1212 from "/1212.png";
import { RiSearchLine } from "react-icons/ri"
import Avatar from 'react-avatar';
import { useDocContext } from '../../Context/DocContext';
import { RxCrossCircled } from "react-icons/rx"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const { token, resUsername } = useDocContext()
    const navigate = useNavigate()

    return (<>
        <div className='navbar z-50 flex  items-center px-3 sm:px-10 md:px h-20 justify-between bg-[#02124f] border-b-8 border-black backdrop-blur-sm'>
            <div className='flex gap-3 items-center justify-start'>
                <img src={image_1212} className='h-12 cursor-pointer' alt="logo" onClick={() => navigate('/')} />
                <h2 className='hidden sm:block text-3xl text-white cursor-pointer' onClick={() => navigate('/')}>MDocs</h2>
                </div>
            <div className="right flex justify-end items-center gap-4">
                <div className="search_icon w-[40vw] md:w-[35vw] relative">
                    <i onClick={() => setToggle(prev => !prev)} className={`absolute text-white  cursor-pointer top-2 transition-transform duration-300 ease-in-out text-3xl ${toggle ? "left-8 transform -translate-x-[90%]" : "right-1 translate-x-0"}`}>{toggle ? <RxCrossCircled className='text-white bg-black rounded-full hover:rotate-180 transition-all duration-300' /> : <RiSearchLine />}</i>
                    <input type="text" className={` pl-10 h-11 border-none outline-none text-xl rounded-md transition-transform duration-100 ease-in ${toggle ? "w-full " : "bg-transparent w-0 opacity-0"}`} placeholder='Search here...' />
                </div>
                {token ? <img src="https://avatar.iran.liara.run/public" className='h-12' /> : <button onClick={() => navigate('/login')} className='login__btn'>Login</button>}
            </div>
        </div>
    </>
    )
}

export default Navbar