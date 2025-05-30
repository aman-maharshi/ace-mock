import React from 'react'
import Agent from '@/app/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'

const Interview = async () => {
  const user = await getCurrentUser()
  // console.log(user, "user")

  return (
    <>
      <h3>Interview Generation</h3>

      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        type="generate"
      />
    </>
  )
}

export default Interview