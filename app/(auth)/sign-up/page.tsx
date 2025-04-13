import AuthForm from '@/app/components/AuthForm'
import React from 'react'

const SignUp = () => {
  return (
    <div>
      <div className='text-center my-4 font-medium text-gray-500'>Sign Up</div>
      <AuthForm type="sign-up" />
    </div>
  )
}

export default SignUp