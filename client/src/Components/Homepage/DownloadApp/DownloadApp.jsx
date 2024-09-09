import React from 'react'
import google from "../../../assets/unnamed.webp"
import apple from "../../../assets/55.svg"

const DownloadApp = () => {
  return (
    <>
    <div className='bg-[#fff9db]  mx-auto py-20 pt-16'>
      <div className='text-center'>
        <h1 className='text-4xl mb-8 sm:text-6xl'>For Better Experience Download
        MDocs App</h1>
      </div>
      <div className='flex items-center justify-center'>
        <img src={google} className='h-[4rem] sm:h-[5.5rem] md:h-[7rem]  xl:h-[10rem] transition-all hover:scale-110 hover:-translate-y-2' alt="" />
        <img src={apple} className='h-[2.8rem] sm:h-[4rem] md:h-[5rem] xl:h-[7rem] transition-all hover:scale-110 hover:-translate-y-2' alt="" />
      </div>
    </div>
    </>
  )
}

export default DownloadApp