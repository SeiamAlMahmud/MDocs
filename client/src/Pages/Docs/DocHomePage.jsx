import React, { useEffect, useRef, useState } from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import { BsPlusLg } from "react-icons/bs"
import DocList from '../../Components/Docs/DocList';
import { useDocContext } from '../../Context/DocContext';
import { useNavigate } from 'react-router-dom';
import CreatePopUp from '../../Components/Docs/CreatePopUp';
import toast from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';

const DocHomePage = () => {
  document.title = `Doc File`;
  ScrollToTop()

  const { token, fetchData, setfetchData, fetchDocs, api} = useDocContext()


  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const popupCreateRef = useRef(null);
  const navigate = useNavigate()


  const [titleState, setTitleState] = useState("")
  // console.log(titleState)


  const handleOpenPopup = () => {
    setIsCreatePopupOpen(true);
  };



  const handleCreateClosePopup = (event) => {
    if (popupCreateRef.current && !popupCreateRef.current.contains(event.target)) {
      setIsCreatePopupOpen(false);
    }
  };

 useEffect(()=>{
  fetchDocs()
 },[])


  const createNewDocHandler = async (e) => {
    e.preventDefault();

    try {

      if (titleState == "") {
        return toast.error("Please fill title field.")
      }

      const response = await api.post(`/docbox/createDoc`, {
        docName: titleState
      }, {
        headers: {
            'Content-Type': 'application/json',  // Sending JSON data
        },
    });

      if (response?.data?.success) {
        // console.log(response?.data)
        toast.success(response.data?.message);
        navigate(`/createdoc/${response.data?.docId}`)
        fetchDocs()
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        toast.success(error?.response?.data?.error || "An unexpected error occurred");
      }
      console.log(error.message || 'An unexpected error occurred');
    }

    // console.log(fetchingURL, titleState.length)
  }

  return (
    <>
      {token && <div>
        <div >

          <div className='flex items-center justify-between px-5 sm:px-10 md:px-20 mt-7  mb-3'>
            <h2 className='text-xl sm:text-4xl'>All Documents</h2>
            <button onClick={handleOpenPopup} className=' flex items-center gap-1 border-0 text-white outline-none p-1 pr-2 sm:p-2 md:p-3 bg-sky-700 rounded-xl min-w-28 cursor-pointer transition-transform ease-linear duration-300 justify-center  hover:bg-[#3882F6] '><i><BsPlusLg /></i> Create New</button>
          </div>
        </div>

        {/* ############## Doc List Section ##########  */}
        <div className='allDoc   px-5 sm:px-10 md:px-20 mt-4   mb-20'>
          
          <h2 className={`text-center text-2xl  mt-20 ${fetchData.length == 0 ? "block" : "hidden"}`}>You have no documents. Let's Create a new Document.</h2>

      { fetchData.length !== 0 ? (  <div className='mt-10'>
          {
            fetchData.map((docData,idx)=> {
              return (
                
                <DocList key={docData._id}  docData={docData} />
              )
            })
          }
          </div>  ) :  <Loading />}
         
        </div>
      </div>
      }
      {/* ############## New Document Create #################   */}
      <CreatePopUp
        popupCreateRef={popupCreateRef}
        isCreatePopupOpen={isCreatePopupOpen} handleCreateClosePopup={handleCreateClosePopup}
        titleState={titleState}
        setTitleState={setTitleState}
        createNewDocHandler={createNewDocHandler}
      />

      {/* ##############  Document Delete #################   */}




    </>
  )
}

export default DocHomePage