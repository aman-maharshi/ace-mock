'use client'

import { signOut } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const LogoutButton = () => {
  
  const handleLogout = async () => {
    try {
      await signOut()
      redirect("/sign-in")
    } catch (error) {
      console.log("Error logging out:", error)
    }
  }

  return (
    <button onClick={handleLogout} className="text-gray-500 cursor-pointer">
      Logout
    </button>
  )
}

export default LogoutButton