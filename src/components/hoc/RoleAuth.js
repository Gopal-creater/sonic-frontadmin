import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { userRoles } from '../../constants/constants'

export default function RoleAuth({ allowedRoles }) {
    const location = useLocation()

    return (
        userRoles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
