import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import { fetchingURL } from '../../FetchURL/fetchingURL';

const CreateDoc = () => {

    document.title = `Create new Doc`
    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')



    // console.log(content)

    const handleFileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // Replace this URL with your server endpoint for handling file uploads
        const uploadUrl = `fetchingURL/upload`;

        fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Add the uploaded file URL to the editor
                    editor.current?.execCommand('insertImage', data.fileUrl);
                } else {
                    console.error('Upload failed');
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };


    const handleCustomButtonClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Adjust this if you need to accept other file types
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        };
        input.click();
    };

    return (
        <div>
            <div className='mx-2 my-3 sm:mx-5 sm:mt-6'>

                <JoditEditor
                    ref={editor}
                    value={content}
                    // config={{
                    //     toolbar: {
                    //       items: [
                    //         'source', 'bold', 'italic', 'underline', '|',
                    //         'ul', 'ol', '|',
                    //         'image', 'link', 'file', '|',
                    //         'align', 'undo', 'redo',
                    //         {
                    //           name: 'upload',
                    //           iconURL: 'https://cdn-icons-png.flaticon.com/512/16/16097.png', // Add a custom icon URL or use your own
                    //           exec: handleCustomButtonClick,
                    //           tooltip: 'Upload File'
                    //         }
                    //       ],
                    //     },
                    //     uploader: {
                    //       insertImageAsBase64URI: false,
                    //       insertImage: handleFileUpload,
                    //     },
                    //   }}
                    tabIndex={1} // tabIndex of textarea
                    onChange={newContent => setContent(newContent)}
                />
            </div>
        </div>
    )
}

export default CreateDoc