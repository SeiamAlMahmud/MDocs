import React, { useState, useRef, useEffect, useCallback } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const DemoDoc = () => {
    document.title = `Create your Demo Doc`


    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const [status, setStatus] = useState("unpublish")



    const updateTitle = (e)=> {
        e.preventDefault();

        toast.success('Your Title is successfully updated')
    }
    const updateStatus = ()=> {

    }

        const formatCreateDate = (isoString) => {
        const date = new Date(isoString);

        // Get the day
        const day = date.getDate();

        // Get the month (Note: getMonth() returns 0-based month index)
        const month = date.getMonth('default', { month: 'long' });

        // Get the year
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    const formatDate = (isoString) => {
        const date = new Date(isoString);

     
        const time =  date.toLocaleString()
        return `${time}`;
    };
// console.log(docData)
const now = Date.now()
    const formattedCreatedAt = formatCreateDate(now);
    const formattedUpdatedAt = formatDate(now);
    return (
        <div>
            <div className='mx-2 my-3 sm:mx-5 sm:mt-6 '>
                    <form onSubmit={updateTitle}>
                        <div className='mb-4  w-full flex justify-center mx-auto px-4 border-[3px] rounded-lg py-1 items-center gap-2'>
                            <label htmlFor="title" className=''>Title</label>
                            <input type="text" id='title' className=' w-full py-2 my-1 border rounded-md text-lg pl-4' />
                            <button
                                type='submit'
                                className='border border-black py-1 px-2 rounded-lg bg-[#1a1e2c] hover:bg-[#14286d] transition-all text-white text-lg md:text-xl'>Save</button>
                        </div>
                    </form>
                    <div className='w-full flex justify-between items-center px-4 mb-4'>
                        <div className='text-sm flex flex-col sm:flex-row sm:gap-4 gap-1'><span className='hidden sm:block'> Created: {formattedCreatedAt}</span>
                        <span className='hidden sm:block'>|</span>
                        <span> Last Updated: {formattedUpdatedAt}</span> </div>
                        <div className='gap-3 flex flex-col sm:flex-row text-sm md:text-lg'>
                            <select
                             value={status} 
                             onChange={(e)=> setStatus(e.target.value)}
                             className='px-2 py-2 rounded-t-lg text-center'
                             >
                                <option value="publish">Publish</option>
                                <option value="unpublish">Unpublish</option>
                            </select>
                            <button onClick={updateStatus} className='border border-black p-1 rounded-lg bg-[#1a1e2c] hover:bg-[#14286d] transition-all text-white text-sm md:text-lg'>Submit</button> 
                            </div>
                    </div>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) =>  setContent(newContent)}
                    />
                </div>
        </div>
    )
}

export default DemoDoc




// const CreateDoc = () => {
 


// // console.log(status)
//     return (
//         <div>

//             {
//                 token ? (<div className='mx-2 my-3 sm:mx-5 sm:mt-6 '>
//                     <form onSubmit={updateTitle}>
//                         <div className='mb-4  w-full flex justify-center mx-auto px-4 border-[3px] rounded-lg py-1 items-center gap-2'>
//                             <label htmlFor="title" className=''>Title</label>
//                             <input type="text" id='title' className=' w-full py-2 my-1 border rounded-md text-lg'
//                                 value={title}
//                                 onChange={(e) => settitle(e.target.value)}
//                             />
//                             <button
//                                 type='submit'
//                                 className='border border-black py-1 px-2 rounded-lg bg-[#1a1e2c] hover:bg-[#14286d] transition-all text-white text-lg md:text-xl'>Save</button>
//                         </div>
//                     </form>
//                     <div className='w-full flex justify-between items-center px-4 mb-4'>
//                         <div className='text-sm flex flex-col sm:flex-row sm:gap-4 gap-1'><span className='hidden sm:block'> Created: {formattedCreatedAt}</span>
//                         <span className='hidden sm:block'>|</span>
//                         <span> Last Updated: {formattedUpdatedAt}</span> </div>
//                         <div className='gap-3 flex flex-col sm:flex-row text-sm md:text-lg'>
//                             <select
//                              value={status} 
//                              onChange={(e)=> setStatus(e.target.value)}
//                              className='px-2 py-2 rounded-t-lg text-center'
//                              >
//                                 <option value="publish">Publish</option>
//                                 <option value="unpublish">Unpublish</option>
//                             </select>
//                             <button onClick={updateStatus} className='border border-black p-1 rounded-lg bg-[#1a1e2c] hover:bg-[#14286d] transition-all text-white text-sm md:text-lg'>Submit</button> 
//                             </div>
//                     </div>
//                     <JoditEditor
//                         ref={editor}
//                         value={content}
//                         tabIndex={1} // tabIndex of textarea
//                         onChange={(newContent) => {
//                             setContent(newContent); // Update state
//                             // updateDoc()
//                             debouncedUpdate(newContent); // Call the debounced function

//                         }}
//                     />
//                 </div>) : ""
//             }
//         </div>
//     )
// }

// export default CreateDoc