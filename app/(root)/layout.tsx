import { isAuthenticated, signOut } from "@/lib/actions/auth.action"
import { redirect } from "next/navigation"
import React, { ReactNode } from "react"
import LogoutButton from "../components/LogoutButton"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "../components/Logo"

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) {
    redirect("/sign-in")
  }

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Logo />

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
