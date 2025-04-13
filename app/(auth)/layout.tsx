import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='auth-layout border border-gray-500'>{children}</div>
  )
}

export default AuthLayout