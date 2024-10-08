import React, { useState, useRef, useEffect, useCallback } from 'react';
import JoditEditor from "jodit-pro-react";
import { useNavigate, useParams } from 'react-router-dom'
import { useDocContext } from '../../Context/DocContext';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';
import { FaLink } from "react-icons/fa";



const CreateDoc = () => {
    document.title = `Create new Doc`


    const { token , api} = useDocContext()

    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const [title, settitle] = useState('')
    const [docData, setDocData] = useState({})
    const [status, setStatus] = useState("unpublish")
    const navigate = useNavigate()



    // console.log(content)

    const updateDoc = async (newContent) => {
        // console.log(fetchingURL)
        try {
            const response = await api.post(`/docbox/updateDoc`, {
                content: newContent,
                docId: docsId
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Sending JSON data
                },
            })
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
            const response = await api.post(`/docbox/getDoc`, {
                docId: docsId
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Sending JSON data
                },
            })

            // console.log(response.data)
            if (response.data?.success) {
                setContent(response.data?.docData?.content);
                setDocData(response.data?.docData)
                setStatus(response.data?.docData?.isPublish)
                settitle(response.data?.docData?.title)
            }
        } catch (error) {
            if (error.response) {
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
            const response = await api.post(`/docbox/updateTitle`, {
                docId: docsId,
                title: title
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Sending JSON data
                },
            })

            // console.log(response.data)
            if (response.data?.success) {
                settitle(response.data?.docData?.title)
                toast.success("New title updated");
                fetchContent()
            }
        } catch (error) {
           
                if (!error?.response?.data?.success) {
                    toast.success(error?.response?.data?.error || "An unexpected error occurred");
                }
                console.log(error.message || 'An unexpected error occurred');
            
        }
    };

    const updateStatus = async (e) => {
        try {
            // Replace with your actual fetching logic, like using fetch() or axios
            const response = await api.post(`/docbox/updateStatus`, {
                docId: docsId,
                isPublish: status
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Sending JSON data
                },
            })

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
        <div>
            <div className='mx-2 my-3 sm:mx-6 flex gap-3'>
                <button onClick={()=> window.history.back()} className=' bg-[#80808054] p-[4px] text-black rounded-sm cursor-pointer transition-all hover:bg-[#808080] hover:text-white w-16 text-center'>Back</button>
                <button onClick={()=> navigate(`/preview`, { state: {docData}})} className=' bg-[#80808054] p-[4px] text-black rounded-sm cursor-pointer transition-all hover:bg-[#808080] hover:text-white w-16 text-center'>peview</button>
                <button onClick={copyToClipboard} className={`text-sm p-2 ${docData.isPublish == 'unpublish' ? 'text-[#808080]' : 'text-black'}`} disabled={docData.isPublish == 'unpublish' && true} ><FaLink /></button>
            </div>
            {
                token && Object.keys(docData).length !== 0 ? (<div className='mx-2 my-3 sm:mx-5 sm:mt-6 '>
                    <form onSubmit={updateTitle}>
                        <div className='mb-4  w-full flex justify-center mx-auto px-4 border-[3px] rounded-lg py-1 items-center gap-2'>
                            <label htmlFor="title" className=''>Title</label>
                            <input type="text" id='title' className=' w-full py-1 my-1 border rounded-md text-sm md:text-lg pl-4'
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='border border-black py-1 px-2 rounded-lg bg-[#1a1e2c] hover:bg-[#14286d] transition-all text-white text-sm md:text-lg'>Save</button>
                        </div>
                    </form>
                    <div className='w-full flex justify-between items-center px-4 mb-4'>
                        <div className='text-sm flex flex-col sm:flex-row sm:gap-4 gap-1 items-center'><span className='hidden sm:block'> Created: {formattedCreatedAt}</span>
                        <span className='hidden sm:block'>|</span>
                        <span> Last Updated: {formattedUpdatedAt}</span> 
                      
                        </div>
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
                </div>) : <Loading />
            }
        </div>
    )
}

export default CreateDoc