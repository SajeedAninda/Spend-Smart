import { InfinitySpin } from 'react-loader-spinner'
import useAuth from '../../Hooks/useAuth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  let { loggedInUser, loading } = useAuth()

  if (loading) {
    return (
      <div className='flex justify-center min-h-screen items-center'>
        <InfinitySpin
          visible={true}
          width='200'
          color='#30e4ba'
          ariaLabel='infinity-spin-loading'
        />
      </div>
    )
  }

  if (loggedInUser) {
    return children
  }

  return <Navigate to='/login'></Navigate>
}

export default PrivateRoute
