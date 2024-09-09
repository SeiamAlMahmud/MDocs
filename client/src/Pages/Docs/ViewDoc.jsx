import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchingURL } from '../../FetchURL/fetchingURL'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import { IoMdPrint } from "react-icons/io";
import { useDocContext } from '../../Context/DocContext'

const ViewDoc = () => {
  const { docsId } = useParams()
  const [docData, setDocData] = useState({})
  const navigate = useNavigate()
  const { api } = useDocContext()
  const location = useLocation()
  const pathname = location.pathname;



  const getViewDoc = async () => {
    // console.log(docData)
    try {

      const response = await api.post(`/docbox/forpublic`, {
        docId: docsId
      })
      // console.log(response.data, "jj")
      if (response.data?.success) {
        setDocData(response.data?.docData)
      }
      if (!response.data?.success) {
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getViewDoc()
  }, [pathname])

  useEffect(() => {
    getViewDoc()
  }, [])

  const formatedDate = (exisDate) => {
    const initialtime = new Date(exisDate)

    const time = initialtime.toLocaleTimeString()
    const formattedDate = initialtime.toLocaleDateString('en-GB', {
      day: '2-digit',     // Two-digit day (e.g., 05)
      month: 'short',     // Short month name (e.g., Sep)
      year: 'numeric',    // Full year (e.g., 2024)
    });

    return `${time} , ${formattedDate}`
  }

  const handlePrint = () => {
    window.print(); // Triggers the browser's print functionality
  }
  return (
    <>
      {
        // Check if docData is an empty object
        Object.keys(docData).length === 0 ? <Loading /> : (
          <div className='h-full w-full px-10 flex flex-col mt-10'>
            <div className="title flex font-serif items-center gap-4 text-3xl md:text-5xl border-b pb-2">
              <h1> <span className='font-serif'> Title:</span>
                <span className='hover:text-[#BB0055] hover:underline cursor-pointer'> {docData?.title}</span>  </h1>
            </div>
            <div>
              <h3>Created by: {docData?.uploadBy}</h3>
            </div>
            <div>
              <h3>Created: {formatedDate(docData?.createdAt)}</h3>
            </div>
            <div className='mb-7'>
              <h3>Last Updated: {formatedDate(docData?.updatedAt)}</h3>
            </div>
            <div className=' border-2 p-3  mb-8 rounded-lg' dangerouslySetInnerHTML={{ __html: docData?.content }} />
            <button
              onClick={handlePrint}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center text-sm md:text-lg xl:text-2xl justify-center gap-1 w-20 xl:w-36 mb-24'
            >
              <i><IoMdPrint /></i>
              Print
            </button>
          </div>
        )
      }
    </>
  )
}

export default ViewDoc