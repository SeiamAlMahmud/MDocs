import React, { useEffect, useRef, useState } from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import { BsPlusLg } from "react-icons/bs"
import DocList from '../../Components/Docs/DocList';
import { useDocContext } from '../../Context/DocContext';
import { useNavigate } from 'react-router-dom';
import CreatePopUp from '../../Components/Docs/CreatePopUp';
import DeletePopUp from './DeletePopUp';
import { fetchingURL } from '../../FetchURL/fetchingURL';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

const DocHomePage = () => {
  document.title = `Doc File`;
  ScrollToTop()

  const { token } = useDocContext()

  const [fetchData, setfetchData] = useState([]);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const popupCreateRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const navigate = useNavigate()


  const [titleState, setTitleState] = useState("")
  // console.log(titleState)


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

  const closeCancelButtonHandler = () => {
    // console.log("first")
    setIsDeletePopupOpen(false);

  }

  const createNewDocHandler = async () => {

    try {

      if (titleState == "") {
        return toast.error("Please fill title field.")
      }

      const response = await axios.post(`${fetchingURL}/docbox/createDoc`, {
        docName: titleState
      }, { withCredentials: true });

      if (response?.data?.success) {
        // console.log(response?.data)
        toast.success(response.data?.message);
        navigate(`/createdoc/${response.data?.docId}`)
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        toast.success(error?.response?.data?.error || "An unexpected error occurred");
      }
      console.log(error.message || 'An unexpected error occurred');
    }

    // console.log(fetchingURL, titleState.length)
  }


  const fetchDocs = async () => {
    try {
      // Replace with your actual fetching logic, like using fetch() or axios
      const response = await axios.post(`${fetchingURL}/docbox/getDocViaUser`, {}, { withCredentials: true })

      // console.log(response.data)
      if (response.data?.success) {
        setfetchData(response.data?.docData?.documents.reverse())
      }
    } catch (error) {
      if (response?.data?.success) {
        if (!error?.response?.data?.success) {
          toast.success(error?.response?.data?.error || "An unexpected error occurred");
        }
        console.log(error.message || 'An unexpected error occurred');
      }
    }
  };
  
  useEffect(() => {
    fetchDocs()
  }, [])
  // console.log(fetchData)



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
      { fetchData.length !== 0 ? (  <div>
          {
            fetchData.map((docData,idx)=> {
              return (
                
                <DocList key={docData._id} handleDeleteOpenPopup={handleDeleteOpenPopup} docData={docData} />
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