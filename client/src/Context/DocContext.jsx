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

      // Axios global defaults
//   axios.defaults.baseURL = 'https://api.backend.com'; // Your backend API
  axios.defaults.withCredentials = true;              // Send credentials with every request


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
            const response = await axios.post(`${fetchingURL}/users/logout`, {}, { withCredentials: true });
            console.log('User logged out');

            if (response.data?.success) {
                setToken(false)
                toast.success(response.data?.message);
                
            }

        } catch (error) {
            console.error('Logout failed:', error.response.data);
        }
    };

    const fetchDocs = async () => {
        try {
      
          const response = await axios.post(`${fetchingURL}/docbox/getDocViaUser`, {}, { withCredentials: true })
    
          // console.log(response.data)
          if (response.data?.success) {
            setfetchData(response.data?.docData?.documents.reverse())
          }
        } catch (error) {
          if (error?.response) {
            if (!error?.response?.data?.success) {
              toast.success(error?.response?.data?.error || "An unexpected error occurred");
            }
            console.log(error.message || 'An unexpected error occurred');
          }
        }
      };

      useEffect(() => {
        fetchDocs()
      }, [])



    const Contextvalue = { token, setToken, logout, count, setCount, isVisible, setIsVisible, resUsername, setResUsername, fetchData, setfetchData,fetchDocs }
    return (
        <>
            <webContext.Provider value={Contextvalue}>
                {children}
            </webContext.Provider>
        </>
    )
}

export default DocContext