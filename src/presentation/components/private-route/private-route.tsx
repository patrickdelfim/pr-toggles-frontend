import React, { useContext } from 'react'
import { RouteProps, Navigate, Outlet } from 'react-router-dom'
import { ApiContext } from '@/presentation/context/api-context'

const PrivateRoute: React.FC<RouteProps> = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken
    ? <Outlet />
    : <Navigate to='/login' replace/>
}
export default PrivateRoute
