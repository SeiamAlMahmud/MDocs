import React, { useState, useRef, useEffect, useCallback } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import { fetchingURL } from '../../FetchURL/fetchingURL';
import { useDocContext } from '../../Context/DocContext';
import axios from 'axios';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';

const CreateDoc = () => {
    document.title = `Create new Doc`


    const { token } = useDocContext()

    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const [title, settitle] = useState('')
    const [docData, setDocData] = useState({})
    const [status, setStatus] = useState("unpublish")



    // console.log(content)

    const updateDoc = async (newContent) => {
        // console.log(fetchingURL)
        try {
            const response = await axios.post(`${fetchingURL}/docbox/updateDoc`, {
                content: newContent,
                docId: docsId
            }, { withCredentials: true })
            // console.log(response?.data)

            if (response?.data?.success) {
                setDocData(response?.data?.docData)
                if (!error?.response?.data?.success) {
                    toast.success(error?.response?.data?.error || "An unexpected error occurred");
                }
                console.log(error.message || 'An unexpected error occurred');
            }

        } catch (error) {

        }
    }

    const fetchContent = async () => {
        try {
            // Replace with your actual fetching logic, like using fetch() or axios
            const response = await axios.post(`${fetchingURL}/docbox/getDoc`, {
                docId: docsId
            }, { withCredentials: true })

            // console.log(response.data)
            if (response.data?.success) {
                setContent(response.data?.docData?.content);
                setDocData(response.data?.docData)
                setStatus(response.data?.docData?.isPublish)
                settitle(response.data?.docData?.title)
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

    // Debounced function to handle content changes
    const debouncedUpdate = useCallback(
        debounce((newContent) => updateDoc(newContent), 500),
        []
    );

    useEffect(() => {
        if (docsId) {
            fetchContent();
        }
    }, []);


    const updateTitle = async (e) => {
        e.preventDefault();
        try {
            // Replace with your actual fetching logic, like using fetch() or axios
            const response = await axios.post(`${fetchingURL}/docbox/updateTitle`, {
                docId: docsId,
                title: title
            }, { withCredentials: true })

            // console.log(response.data)
            if (response.data?.success) {
                settitle(response.data?.docData?.title)
                toast.success("New title updated");
                fetchContent()
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

    const updateStatus = async (e) => {
        try {
            // Replace with your actual fetching logic, like using fetch() or axios
            const response = await axios.post(`${fetchingURL}/docbox/updateStatus`, {
                docId: docsId,
                isPublish: status
            }, { withCredentials: true })

            // console.log(response.data)
            if (response.data?.success) {
                setDocData(response.data?.docData)
                toast.success("Status updated");
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
    const formattedCreatedAt = formatCreateDate(docData?.createdAt);
    const formattedUpdatedAt = formatDate(docData?.updatedAt);
// console.log(status)
    return (
        <div>

            {
                token ? (<div className='mx-2 my-3 sm:mx-5 sm:mt-6 '>
                    <form onSubmit={updateTitle}>
                        <div className='mb-4  w-full flex justify-center mx-auto px-4 border-[3px] rounded-lg py-1 items-center gap-2'>
                            <label htmlFor="title" className=''>Title</label>
                            <input type="text" id='title' className=' w-full py-2 my-1 border rounded-md text-lg'
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                            />
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
                        onChange={(newContent) => {
                            setContent(newContent); // Update state
                            // updateDoc()
                            debouncedUpdate(newContent); // Call the debounced function

                        }}
                    />
                </div>) : ""
            }
        </div>
    )
}

export default CreateDoc