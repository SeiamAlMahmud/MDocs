import React, { useRef, useState } from 'react'
import DocIcon from "/document-1287618_1280.png"
import { MdDelete } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import DeletePopUp from '../../Pages/Docs/DeletePopUp'
import { FaLink } from "react-icons/fa";
import toast from 'react-hot-toast'



const DocList = ({ docData }) => {

    const navigate = useNavigate()
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const popupDeleteRef = useRef(null);

    const handleDeleteOpenPopup = () => {
        setIsDeletePopupOpen(true);
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


    const formatDate = (isoString) => {
        const date = new Date(isoString);

        // Get the day
        const day = date.getDate();

        // Get the month (Note: getMonth() returns 0-based month index)
        const month = date.toLocaleString('default', { month: 'long' });

        // Get the year
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };
// console.log(docData)
    const formattedCreatedAt = formatDate(docData?.createdAt);
    const formattedUpdatedAt = formatDate(docData?.updatedAt);


    const copyToClipboard = () => {
        if (docData.isPublish == 'publish') {
            
            const link = `https://mdoc.almahmud.top/view/${docData?._id}`; // Replace with the string or link you want to copy
            navigator.clipboard.writeText(link).then(
                () => {
                    toast.success('Copied')
        },
        (err) => {
            console.error("Failed to copy: ", err);
        }
    );
}};



    return (
        <>

            <div className='flex items-center justify-between p-3 bg-[#F0F0F0] hover:bg-[#DCDCDC] mt-1 transition-all cursor-pointer '>
                <div className="left flex gap-3 flex-col sm:flex-row">
                    <img onClick={() => navigate(`/createdoc/${docData._id}`)} src={DocIcon} alt="docIcon" className='h-12 w-12 sm:h-16 md:h-20 sm:w-16 md:w-20' />
                    <div className='flex flex-col gap-1 mt-1 s'>
                        <div className='flex justify-start items-center gap-2'>
                        <h3 onClick={() => navigate(`/createdoc/${docData._id}`)} className='text-md font-semibold overflow-hidden'>{docData?.title}</h3>
                        <button onClick={copyToClipboard} className={`text-sm p-2 ${docData.isPublish == 'unpublish' ? 'text-[#808080]' : 'text-black'}`} disabled={docData.isPublish == 'unpublish' && true} ><FaLink /></button>
                        </div>
                        <p className='text-[#808080]'>Created In: {formattedCreatedAt} | Last Update: {formattedUpdatedAt}</p>
                    </div>
                </div>
                <div className="right">
                    <MdDelete onClick={handleDeleteOpenPopup} className='text-4xl ml-5 mr-2 text-[red] transition-all hover:text-red-600 cursor-pointer' />
                </div>
            </div>
            <DeletePopUp
                docData={docData}
                isDeletePopupOpen={isDeletePopupOpen}
                popupDeleteRef={popupDeleteRef}
                handleDeleteClosePopup={handleDeleteClosePopup}
                closeCancelButtonHandler={closeCancelButtonHandler}
            />

        </>
    )
}

export default DocList