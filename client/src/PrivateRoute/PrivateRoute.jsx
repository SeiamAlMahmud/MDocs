import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDocContext } from '../Context/DocContext'

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const { token } = useDocContext()
    // console.log(location)

    useEffect(()=> {

        if (!token) {
            return navigate("/login", { state:{from: location.pathname }})
        }
        
    },[])
    
    return children
}

export default PrivateRoute