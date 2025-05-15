'use client'

import { signOut } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import { LogOut } from "lucide-react"

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
    <button onClick={handleLogout} className="text-gray-500 cursor-pointer flex text-sm items-center gap-2">
      Logout <LogOut className='w-4 h-4' />
    </button>
  )
}

export default LogoutButton