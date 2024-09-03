import React, { useRef, useState } from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import { BsPlusLg } from "react-icons/bs"
import DocList from '../../Components/Docs/DocList';
import { useDocContext } from '../../Context/DocContext';
import { useNavigate } from 'react-router-dom';
import CreatePopUp from '../../Components/Docs/CreatePopUp';
import DeletePopUp from './DeletePopUp';

const DocHomePage = () => {
  document.title = `Doc File`;
  ScrollToTop()



  const { token } = useDocContext()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const popupCreateRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const navigate = useNavigate()



  const handleOpenPopup = () => {
    setIsCreatePopupOpen(true);
  };

  const handleDeleteOpenPopup = () => {
    setIsDeletePopupOpen(true);
  };

  const handleCreateClosePopup = (event) => {
    if (popupCreateRef.current && !popupCreateRef.current.contains(event.target)) {
      setIsCreatePopupOpen(false);
    }
  };

  const handleDeleteClosePopup = (event) => {
    if (popupDeleteRef.current && !popupDeleteRef.current.contains(event.target)) {
      setIsDeletePopupOpen(false);
    }
  };

  const closeCancelButtonHandler = ()=> {
    // console.log("first")
    setIsDeletePopupOpen(false);

  }

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
          <DocList handleDeleteOpenPopup={handleDeleteOpenPopup}  />
          <DocList handleDeleteOpenPopup={handleDeleteOpenPopup}  />
        </div>
      </div>
      }

      <CreatePopUp
        popupCreateRef={popupCreateRef}
        isCreatePopupOpen={isCreatePopupOpen} handleCreateClosePopup={handleCreateClosePopup} />

      <DeletePopUp
        isDeletePopupOpen={isDeletePopupOpen}
        popupDeleteRef={popupDeleteRef}
        handleDeleteClosePopup={handleDeleteClosePopup}
        closeCancelButtonHandler={closeCancelButtonHandler}
      />

    </>
  )
}

export default DocHomePage