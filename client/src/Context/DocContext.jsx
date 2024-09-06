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

  // Create an Axios instance
  const api = axios.create({
    baseURL: fetchingURL,  // Backend URL
  });

  // Axios Interceptor to Attach Token to Requests
api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;  // Attach Bearer token to Authorization header
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

  useEffect(() => {
    checkLoginStatus();

  }, [])
  // console.log(count)


  const checkLoginStatus = async () => {
    try {
      const response = await api.get(`/users/dashboard`);
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
 
    localStorage.removeItem('token')
    setToken(false)
  };

  const fetchDocs = async () => {
    try {

      const response = await api.post(`/docbox/getDocViaUser`, {}, {
        headers: {
            'Content-Type': 'application/json',  // Sending JSON data
        },
    })

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



  const Contextvalue = { token, setToken, logout, count, setCount, isVisible, setIsVisible, resUsername, setResUsername, fetchData, setfetchData, fetchDocs, api }
  return (
    <>
      <webContext.Provider value={Contextvalue}>
        {children}
      </webContext.Provider>
    </>
  )
}

export default DocContext