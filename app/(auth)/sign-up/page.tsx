import AuthForm from "@/app/components/AuthForm"
import AuthHero from "@/app/components/AuthHero"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react"

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-300 dark:to-dark-100">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Column - App Content */}
        <AuthHero />

        {/* Right Column - Auth Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12">
          <div className="w-full max-w-md">
            <AuthForm type="sign-up" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
