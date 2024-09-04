import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaUser} from "react-icons/fa"



const NavbarPopup = () => {
    const navigate = useNavigate()
  return (
    <div className='relative'>
        <img src="https://avatar.iran.liara.run/public" className='h-12' />

        <div className=' border-[rgba(0,0,0,0.14)] border rounded-lg w-[45vw] sm:w-[30vw] md:w-[15vw] absolute top-[142%] right-0'>
            <ul className='flex flex-col items-center w-full hidden'>
                <li onClick={()=> navigate("/doc")} className='flex justify-around w-full items-center text-lg py-1  border hover:bg-[#80808030] transition-all'><i><FaUser /></i><span>My Docs</span> </li>
                
                <li onClick={()=> navigate("/doc")} className='flex justify-around w-full items-center text-lg py-1  border hover:bg-[#80808030] transition-all'><i><FaUser /></i><span>My Docs</span> </li>
                
            </ul>
        </div>
    </div>
  )
}

export default NavbarPopup