import React, { useCallback, useEffect, useState } from 'react'
import image_1212 from "/1212.png";
import { RiSearchLine } from "react-icons/ri"
import Avatar from 'react-avatar';
import { useDocContext } from '../../Context/DocContext';
import { RxCrossCircled } from "react-icons/rx"
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarPopup from './NavbarPopup';
import debounce from "lodash/debounce"


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [documents, setDocuments] = useState([])
    const { token, api } = useDocContext()
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname;

    useEffect(() => {
        setToggle(false)
    }, [pathname])


    const debouncedUpdate = useCallback(
        debounce((search) => fetchSearch(search), 500),
        []
    )

    //    console.log(documents)
    const fetchSearch = async (search) => {
        try {

            if (search == "" || search == " " ) {
                return
            }
            const response = await api.post(`/docbox/search`, { search },
                {
                    headers: {
                        'Content-Type': 'application/json',  // Sending JSON data
                    },
                }
            )

            if (response.data?.success) {
                // console.log(response.data?.documents)
                setDocuments(response.data?.documents)
            }

        } catch (error) {
            if (error?.response) {
                if (!error?.response?.success) {
                    console.log(error?.response?.error)
                }
                console.log(error)
                
            }
        }
    }
    // console.log(location.pathname)
    return (<>
        <div className={`navbar z-[100] flex  items-center px-3 sm:px-10 md:px h-14 py-8  md:h-20 justify-between ${location.pathname == "/" ? "bg-[#02124f]" : "bg-[#fcc419]"}  border-b-8  : "text-black"} border-black backdrop-blur-sm z-50 `}>
            <div className='flex gap-3 items-center justify-start '>
                <img src={image_1212} className='h-12 cursor-pointer' alt="logo" onClick={() => navigate('/')} />
                <h2 className={`${toggle && "hidden"} sm:block text-3xl ${location.pathname == "/" ? "text-white" : "text-black"} font-bold cursor-pointer`} onClick={() => navigate('/')}>MDocs</h2>
            </div>
            <div className="right flex justify-end items-center gap-4 ">
                <div className="search_icon w-[50vw] md:w-[35vw] relative">
                    <i onClick={() => setToggle(prev => !prev)} className={`absolute text-white  cursor-pointer top-2 transition-transform duration-300 ease-in-out text-3xl ${toggle ? "left-8 transform -translate-x-[90%]" : "right-1 translate-x-0"}`}>{toggle ? <RxCrossCircled className='text-white bg-black rounded-full hover:rotate-180 transition-all duration-300' /> : <RiSearchLine />}</i>
                    <input
                        type="text"
                        onChange={(e) =>  debouncedUpdate(e.target.value)}
                        className={` pl-10 h-11 border-none outline-none text-xl text-lack rounded-md transition-transform duration-100 ease-in ${toggle ? "w-full " : "bg-transparent w-0 opacity-0"}`}
                        placeholder='Search here...' />
                    {toggle &&
                        <ul className={` absolute  ${pathname == '/' && "border-2 border-white"} w-[65vw] sm:w-[55vw] md:w-[45vw] top-14 md:top-16 -right-14 text-left flex flex-col  bg-[rgba(0,0,0,0.7)] text-white rounded-md overflow-hidden overflow-y-auto max-h-[70vw] sm:max-h-[60vw] md:max-h-[40vw] lg:max-h-[30vw] xl:max-h-[22vw]`}>

                            {
                                documents.map((document)=> {
                                    return (

                                        <li onClick={()=> navigate(`/view/${document._id}`)} key={document._id} className='border-b-4 border-[#808080] py-1  pl-2 w-full cursor-pointer'>{document.title}</li>
                                    )
                                })
                            }

                        </ul>}
                </div>
                {token ? <NavbarPopup setToggle={setToggle} /> : <button onClick={() => navigate('/login')} className='login__btn'>Login</button>}
            </div>
        </div>
    </>
    )
}

export default Navbar