import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import { IoMdPrint } from "react-icons/io";
import { useDocContext } from '../../Context/DocContext'

const PreviewDoc = () => {
  const { docsId } = useParams()
  const [docData, setDocData] = useState({})
  const navigate = useNavigate()
  const { api } = useDocContext()

  const location = useLocation()
  const storeDocData = location.state?.docData


  useEffect(() => {
    // getViewDoc()
    if (location.state && storeDocData) {
      setDocData(storeDocData)
    }

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
          <div className='h-full w-full px-10 flex flex-col mt-10 relative'>
             <div className='mb-3'>
        <button onClick={() => window.history.back()} className=' bg-[#80808054] p-[4px] text-black rounded-sm cursor-pointer transition-all hover:bg-[#808080] hover:text-white w-16 text-center'>Back</button>
      </div>
            <p className='absolute right-[-3.25rem] -top-0 rotate-45 text-2xl bg-[#808080] w-52 text-center -z-10 font-serif text-white font-extralight'>Preview</p>
            <div className="title flex font-serif items-center gap-4 text-3xl md:text-5xl border-b pb-2 -z-20">
              <h1> <span className='font-serif'> Title:</span>
                <span className='hover:text-[#fcc419] hover:underline cursor-pointer'> {docData?.title}</span>  </h1>
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
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center text-sm md:text-lg xl:text-2xl justify-center gap-1 w-20 xl:w-36 mb-24 border'
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

export default PreviewDoc