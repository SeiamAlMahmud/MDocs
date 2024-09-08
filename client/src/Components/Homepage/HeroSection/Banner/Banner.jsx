import React from 'react'
import hero from "../../../../assets/hero-img.svg"
import { Tilt } from 'react-tilt'




const Banner = () => {
  return (
   <>
   <div className='flex justify-around flex-col-reverse md:mx-20 gap-5 md:gap-0 items-center lg:flex-row mt-10 pb-5'>
    <h1 style={{lineHeight:1}} className='text-[3.5rem] sm:text-[3.5rem] mx-10 md:text-[4rem] xl:text-[5.5rem] font-bold'>
    Work in a <br /> <span className='text-[#BF0058]'> hassle-free </span><br />  and <span className='text-[#BF0058]'> auto-save mode</span><br /> for a smoother experience.
    </h1>
    <img src="https://seiamalmahmud.github.io/Dream/images/hero-img.svg" className='md:mt-14 mt-5 mr-5 h-[500px]' alt="" />
   </div>
   </>
  )
}

export default Banner