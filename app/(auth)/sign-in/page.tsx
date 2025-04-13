import AuthForm from '@/app/components/AuthForm'
import React from 'react'

const SignIn = () => {
  return (
    <div>
      <div className='text-center my-4 font-medium text-gray-500'>Sign In</div>
      <AuthForm type="sign-in" />
    </div>
  )
}

export default SignIn