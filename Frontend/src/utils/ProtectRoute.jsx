import React from 'react'
import { useAuth } from '../Context/authContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
    const { userData, loading } = useAuth()

    if (loading) return <h1>Loading...</h1>

    if (userData === null) return <Navigate to="/login" replace />

    return <Outlet />
}

export default ProtectRoute
