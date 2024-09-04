import React, { useState, useRef, useEffect, useCallback } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import { fetchingURL } from '../../FetchURL/fetchingURL';
import { useDocContext } from '../../Context/DocContext';
import axios from 'axios';
import debounce from 'lodash/debounce';

const CreateDoc = () => {
    document.title = `Create new Doc`


    const { token } = useDocContext()

    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')



    console.log(content)

    const updateDoc = async (newContent) => {
        console.log(fetchingURL)
        try {
            const response = await axios.post(`${fetchingURL}/docbox/updateDoc`, {
                content: newContent,
                docId: docsId
            }, { withCredentials: true })
            console.log(response?.data)

            if (response?.data?.success) {
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
            const response = await fetch(`your-api-endpoint/${docsId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            // Assuming data.content contains the editor's content
            setContent(data.content);
        } catch (error) {
            console.error('Failed to fetch content:', error);
        }
    };

    // Debounced function to handle content changes
    const debouncedUpdate = useCallback(
        debounce((newContent) => updateDoc(newContent), 500),
        []
    );



    // useEffect(() => {
    //     if (token && docsId) {
    //         fetchContent();
    //     }
    // }, [token, docsId]);

    return (
        <div>
            {
                token ? (<div className='mx-2 my-3 sm:mx-5 sm:mt-6'>

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