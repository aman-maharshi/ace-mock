import AuthForm from '@/app/components/AuthForm'
import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'

const SignUp = () => {
  return (
    <div>
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      {/* <div className='text-center my-4 font-bold text-stone-700 text-lg'>Sign Up</div> */}
      <AuthForm type="sign-up" />
    </div>
  )
}

export default SignUp