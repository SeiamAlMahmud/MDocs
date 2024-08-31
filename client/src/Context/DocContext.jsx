import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';



const webContext = createContext()

export const useDocContext = () => {
    return useContext(webContext)
}
const DocContext = ({ children }) => {

    const [token, setToken] = useState(false)


    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${fetchingURL}/users/dashboard`, { withCredentials: true });
            if (response.data?.success) {
                setToken(true)
            }
            console.log('User is logged in:', response.data);
        } catch (error) {
            console.log('User is not logged in:', error?.response?.data);
        }
    };

    useEffect(() => {
       
        checkLoginStatus();
    }, [])

    const logout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            console.log('User logged out');
            // Redirect to login page or update UI
        } catch (error) {
            console.error('Logout failed:', error.response.data);
        }
    };
    
    const Contextvalue = { token, setToken, logout }
    return (
        <>
            <webContext.Provider value={Contextvalue}>
                {children}
            </webContext.Provider>
        </>
    )
}

export default DocContext