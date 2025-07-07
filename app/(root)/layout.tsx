import { isAuthenticated, signOut } from "@/lib/actions/auth.action"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { ReactNode } from "react"
import LogoutButton from "../components/LogoutButton"
import { ThemeToggle } from "@/components/theme-toggle"

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) {
    redirect("/sign-in")
  }

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <h2 className="text-dark-100 dark:text-primary-100">AceMock</h2>
        </Link>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout
