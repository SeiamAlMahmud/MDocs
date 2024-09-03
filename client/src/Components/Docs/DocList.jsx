import React from 'react'
import DocIcon from "/document-1287618_1280.png"
import { MdDelete } from "react-icons/md"









const DocList = ({ doc }) => {

    return (
        <>
            
            <div className='flex items-center justify-between p-3 bg-[#F0F0F0] hover:bg-[#DCDCDC] mt-1 transition-all cursor-pointer'>
                <div className="left flex gap-3 flex-col sm:flex-row">
                    <img src={DocIcon} alt="docIcon" className='h-12 w-12 sm:h-16 md:h-20 sm:w-16 md:w-20' />
                    <div className='flex flex-col gap-1 mt-1 s'>
                        <h3 className='text-md font-semibold overflow-hidden'>Tips & Ticks for Next js and React Js</h3>
                        <p className='text-[#808080]'>Created In: 3 July 2024 | Last Update: 1 July 2024</p>
                    </div>
                </div>
                <div className="right">
                    <MdDelete className='text-4xl ml-5 mr-2 text-[red] transition-all hover:text-red-600 cursor-pointer' />
                </div>
            </div>


        </>
    )
}

export default DocList