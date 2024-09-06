import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineTitle } from "react-icons/md"
import { FaFileCircleXmark } from "react-icons/fa6";
import { fetchingURL } from '../../FetchURL/fetchingURL';
import axios from 'axios';
import { useDocContext } from '../../Context/DocContext';
import toast from 'react-hot-toast';



const DeletePopUp = ({ popupDeleteRef, isDeletePopupOpen, handleDeleteClosePopup, closeCancelButtonHandler, docData }) => {

    const navigate = useNavigate()
    const {fetchDocs, api} = useDocContext()


   

      const deleteDoc = async () => {
        // console.log(docData)
        try {
            // Replace with your actual fetching logic, like using fetch() or axios
            const response = await api.post(`/docbox/deleteDoc`, {docId: docData._id}, {
              headers: {
                  'Content-Type': 'application/json',  // Sending JSON data
              },
        })
      
            // console.log(response.data)
            if (response.data?.success) {
                console.log(response.data)
                toast.success(response.data?.message)
                closeCancelButtonHandler()
                fetchDocs()
            }
          } catch (error) {
            if (response?.data?.success) {
              if (!error?.response?.data?.success) {
                toast.success(error?.response?.data?.error || "An unexpected error occurred");
              }
              console.log(error.message || 'An unexpected error occurred');
            }
          }
      }

    return (
        <>
            {
                isDeletePopupOpen && <div onClick={(event) => handleDeleteClosePopup(event)} className="createDocModelCon fixed h-screen w-screen inset-0  bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center star">

                    <div ref={popupDeleteRef} onClick={(e) => e.stopPropagation()} className='bg-[#fff] text-3xl w-[80vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] rounded-lg p-4 flex flex-col'>
                        <h3 className='mt-2 mb-4 font-bold'>Delete Document</h3>
                        <div className='flex items-center justify-normal gap-4'>
                            <i className='sm:text-9xl text-8xl text-[red]'><FaFileCircleXmark /> </i>
                            <div className='flex flex-col'>
                                <h4 className='text-xl  md:text-3xl'>Do you want to delete this Document ?</h4>
                                <p className='text-lg font-bold text-[#808080] mt-2 ml-1'> {docData.title}</p>
                            </div>

                        </div>

                        <div className='flex items-center gap-2 justify-between w-full'>
                            <button onClick={deleteDoc} className='border-none outline-none w-1/2 text-center bg-[#1a1e2c] text-white capitalize py-2 rounded-xl mt-6 hover:bg-[red]'>Delete</button>
                            <button onClick={closeCancelButtonHandler} className='border-none outline-none w-1/2 text-center bg-[#1a202c] text-white capitalize py-2 rounded-xl mt-6 hover:bg-[#1d335d]'>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DeletePopUp