import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa"



const NavbarPopup = () => {
  const navigate = useNavigate()
  const [isnavPopupRef, setIsNavPopupRef] = useState(false);
  const location = useLocation()
  const navbarPopRef = useRef()
// console.log("first",navbarPopRef?.current.id)
  const pathname = location.pathname;

  
  document.addEventListener("click", (e)=>{
    if (e.target.id !== navbarPopRef?.current?.id) {
      if (isnavPopupRef === true) {
        setIsNavPopupRef(false)
      }
    }
  })

  useEffect(()=>{
    setIsNavPopupRef(false)
  },[pathname])
  return (
    <div className='relative'>
      <img ref={navbarPopRef} id='navPopup'
      onClick={()=> setIsNavPopupRef(prev => !prev)}
      src="https://avatar.iran.liara.run/public" className='h-12' />

   { isnavPopupRef &&  (<div  className=' border-[rgba(0,0,0,0.14)] border rounded-lg w-[45vw] sm:w-[30vw] md:w-[15vw] absolute top-[142%] right-0 bg-[#fff] pt-1'>
        <ul className='flex flex-col items-center w-full'>
          <li onClick={() => navigate("/doc")} className='flex justify-around w-full items-center text-lg py-1 cursor-pointer  hover:bg-[#80808030] transition-all border-b-2'><i><FaUser /></i><span>My Docs</span> </li>

          {/* <li onClick={()=> navigate("/doc")} className='flex justify-around w-full items-center text-lg py-1   hover:bg-[#80808030] transition-all'><i><FaUser /></i><span>My Docs</span> </li> */}

        </ul>
      </div>)}
    </div>
  )
}

export default NavbarPopup