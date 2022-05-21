import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function RoleAuth({ allowedRoles }) {
    const location = useLocation()
    const user = useSelector(state => state.user)

    return (
        allowedRoles?.find(role => role === user?.userProfile?.data?.userRole)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
