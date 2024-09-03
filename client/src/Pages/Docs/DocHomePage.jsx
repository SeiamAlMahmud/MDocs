import React, { useRef, useState } from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import { BsPlusLg } from "react-icons/bs"
import { MdOutlineTitle } from "react-icons/md"
import DocList from '../../Components/Docs/DocList';
import { useDocContext } from '../../Context/DocContext';
import { useNavigate } from 'react-router-dom';


const DocHomePage = () => {
  document.title = `Doc File`;
  ScrollToTop()



  const { token } = useDocContext()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate()



  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      {token && <div >
        <div>

          <div className='flex items-center justify-between px-5 sm:px-10 md:px-20 mt-7  mb-3'>
            <h2 className='text-xl sm:text-4xl'>All Documents</h2>
            <button onClick={handleOpenPopup} className=' flex items-center gap-1 border-0 text-white outline-none p-1 sm:p-2 md:p-3 bg-sky-700 rounded-xl min-w-28 cursor-pointer transition-transform ease-linear duration-300 justify-center  hover:bg-[#3882F6] '><i><BsPlusLg /></i> Create New Document</button>
          </div>
        </div>

        {/* ############## Doc List Section ##########  */}
        <div className='allDoc  px-5 sm:px-10 md:px-20 mt-4'>
          <DocList />
          <DocList />
          <DocList />
          <DocList />
          <DocList />
        </div>
      </div>
      }


      {isPopupOpen && <div onClick={(event) => handleClosePopup(event)} className="createDocModelCon fixed h-screen w-screen inset-0  bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center star">

        <div ref={popupRef} onClick={(e) => e.stopPropagation()} className='bg-[#fff] text-3xl w-[80vw] sm:w-[65vw] md:w-[40vw] lg:w-[35vw] rounded-lg p-4'>
          <h3>Create New Document</h3>


          <div className='flex flex-col relative w-full'>
            <label htmlFor="email" className='text-xl text-[#808080] font-semibold mt-3'>Title: </label>
            <input type="text" id='title' name='title' placeholder='Title' required 
              className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
            />
            <i className='absolute bottom-3 left-2 text-lg'><MdOutlineTitle /></i>
          </div>

      <div className='flex items-center gap-2 justify-between w-full'>
        <button onClick={()=> navigate("/createdoc")} className='border-none outline-none w-full text-center bg-[#1a202c] text-white capitalize py-3 rounded-xl mt-6 hover:bg-[#1d335d]'>Create</button>
        </div>


        </div>
      </div>}

    </>
  )
}

export default DocHomePage