import { isAuthenticated, signOut } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import LogoutButton from '../components/LogoutButton'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()
  
  if (!isUserAuthenticated) {
    redirect("/sign-in")
  }

  return (
    <div className='root-layout'>
      <nav className='flex items-center justify-between'>
        <Link 
          href="/"
          className='flex items-center gap-2'
        >
          <Image src={"/logo.svg"} alt="Logo" width={38} height={32} />
          <h2 className='text-dark-100 dark:text-primary-100'>AceMock</h2>
        </Link>

        <LogoutButton />
      </nav>
      
      {children}
    </div>
  )
}

export default RootLayout