import React from 'react'
import Agent from '@/app/components/Agent'

const Interview = () => {
  return (
    <>
      <h3>Interview Generation</h3>

      <Agent
        userName="You"
        userId="user1"
        type="generate"
      />
    </>
  )
}

export default Interview