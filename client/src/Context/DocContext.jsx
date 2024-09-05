import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { fetchingURL } from '../FetchURL/fetchingURL';
import toast from 'react-hot-toast';



const webContext = createContext()
export const useDocContext = () => {
    return useContext(webContext)
}
const DocContext = ({ children }) => {

    const [token, setToken] = useState(false)
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [resUsername, setResUsername] = useState("A B C")
  const [fetchData, setfetchData] = useState([]);





    useEffect(() => {
        checkLoginStatus();
   
    }, [])
    // console.log(count)


    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${fetchingURL}/users/dashboard`, { withCredentials: true });
            // console.log(response.data)
            if (response.data?.success) {
                setToken(true)
                setResUsername(response.data?.success)
                toast.success(`Welcome ${response.data?.username}`);
            } else {
                setToken(false)
            }
            // console.log('User is logged in:', response.data);
        } catch (error) {
            if (error.response) {
                console.log('User is not logged in:', error?.response?.data?.error);
            }
        }
    };



    const logout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            console.log('User logged out');
            // Redirect to login page or update UI
        } catch (error) {
            console.error('Logout failed:', error.response.data);
        }
    };

  

    const Contextvalue = { token, setToken, logout, count, setCount, isVisible, setIsVisible, resUsername, setResUsername,fetchData, setfetchData }
    return (
        <>
            <webContext.Provider value={Contextvalue}>
                {children}
            </webContext.Provider>
        </>
    )
}

export default DocContext