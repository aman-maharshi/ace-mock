import React from "react"
import Agent from "@/app/components/Agent"
import { getCurrentUser } from "@/lib/actions/auth.action"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Interview = async () => {
  const user = await getCurrentUser()
  // console.log(user, "user")

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          asChild
        >
          <Link href={`/`}>
            <ArrowLeft className="size-6" />
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-dark-100 dark:text-light-100">Interview Generation</h1>
      </div>

      <Agent userName={user?.name || ""} userId={user?.id} type="generate" />
    </>
  )
}

export default Interview
