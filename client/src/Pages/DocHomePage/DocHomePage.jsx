import React from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import { BsPlusLg } from "react-icons/bs"
import DocList from '../../Components/Docs/DocList';


const DocHomePage = () => {
  document.title = `Doc File`;

  return (
    <>
    <div className='bg-pink-100'>

    <ScrollToTop />
    <div className='flex items-center justify-between px-5 sm:px-10 md:px-20 mt-7  mb-3'>
      <h2 className='text-xl sm:text-4xl'>All Documents</h2>
      <button className=' flex items-center gap-1 border-0 text-white outline-none p-1 sm:p-2 md:p-3 bg-sky-700 rounded-xl min-w-28 cursor-pointer transition-transform ease-linear duration-300 justify-center  hover:bg-[#3882F6] '><i><BsPlusLg /></i> Create New Document</button>
    </div>
    </div>

    {/* ############## Doc List Section ##########  */}
    <div className='px-5 sm:px-10 md:px-20 mt-4'>
    <DocList />
    <DocList />
    <DocList />
    <DocList />
    <DocList />
    </div>
    </>
  )
}

export default DocHomePage