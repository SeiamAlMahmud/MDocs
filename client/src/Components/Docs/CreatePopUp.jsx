import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineTitle } from "react-icons/md"

const CreatePopUp = ({
    popupCreateRef,
    isCreatePopupOpen,
    handleCreateClosePopup,
    titleState,
    setTitleState,
    createNewDocHandler }) => {

    const navigate = useNavigate()

   
    return (
        <>
            {
                isCreatePopupOpen && <div onClick={(event) => handleCreateClosePopup(event)} className="createDocModelCon fixed h-screen w-screen inset-0  bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center star">

                    <div ref={popupCreateRef} onClick={(e) => e.stopPropagation()} className='bg-[#fff] text-3xl w-[80vw] sm:w-[65vw] md:w-[40vw] lg:w-[35vw] rounded-lg p-4'>
                        <h3>Create New Document</h3>

                        <form onSubmit={createNewDocHandler}>
                        <div className='flex flex-col relative w-full'>
                            <label htmlFor="title" className='text-xl text-[#808080] font-semibold mt-3'>Title: </label>
                            <input type="text"
                                id='title'
                                name='title'
                                placeholder='Title'
                                value={titleState}
                                onChange={(e) => setTitleState(e.target.value)}
                                required
                                className='flex bg-[#eaeaea] border-[1px]  focus:outline-red-200 border-hidden outline-none flex-1 pl-8 p-2 rounded-md mt-2 text-lg '
                            />
                            <i className='absolute bottom-3 left-2 text-lg'><MdOutlineTitle /></i>
                        </div>
                        <div className='flex items-center gap-2 justify-between w-full'>
                            <button type='submit'  className='border-none outline-none w-full text-center bg-[#1a202c] text-white capitalize py-3 rounded-xl mt-6 hover:bg-[#1d335d]'>Create</button>
                        </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default CreatePopUp