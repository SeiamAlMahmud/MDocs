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
        <div className='navbar flex  items-center px-3 sm:px-10 md:px h-20 justify-between bg-pink-400 border-b-8 border-sky-500 backdrop-blur-sm'>
            <img src={image_1212} className='h-12' alt="logo" onClick={()=> navigate('/')} />
            <div className="right flex justify-end items-center gap-4">
                <div className="search_icon w-[40vw] md:w-[35vw] relative">
                    <i onClick={() => setToggle(prev => !prev)} className={`absolute cursor-pointer top-2 transition-transform duration-300 ease-in-out text-3xl ${toggle ? "left-7 transform -translate-x-[90%]" : "right-1 translate-x-0"}`}>{ toggle ? <RxCrossCircled /> :<RiSearchLine />}</i>
                    <input type="text" className={` pl-8 h-11 border-none outline-none text-xl rounded-md transition-transform duration-100 ease-in ${toggle ? "w-full " : "bg-transparent w-0 opacity-0"}`} placeholder='Search here...' />
                </div>
                {token ? <img src="https://avatar.iran.liara.run/public" className='h-12' /> : <button className='login__btn'>Login</button>}
            </div>
        </div>
    </>
    )
}

export default Navbar