import React from 'react'
import { useAuth } from '../Context/authContext'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Components/Loader.jsx'

const ProtectRoute = () => {
    const { userData, loading } = useAuth()

    if (loading) return <Loader />

    if (userData === null) return <Navigate to="/login" replace />

    return <Outlet />
}

export default ProtectRoute
