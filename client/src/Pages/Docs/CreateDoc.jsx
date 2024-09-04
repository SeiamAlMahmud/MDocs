import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import { fetchingURL } from '../../FetchURL/fetchingURL';
import { useDocContext } from '../../Context/DocContext';

const CreateDoc = () => {
    document.title = `Create new Doc`


    const { token } = useDocContext()

    const { docsId } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('')



    console.log(content)

 


    return (
        <div>
            {
              token ? ( <div className='mx-2 my-3 sm:mx-5 sm:mt-6'>

<JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onChange={newContent => setContent(newContent)}
		/>
                </div>) : ""
            }
        </div>
    )
}

export default CreateDoc