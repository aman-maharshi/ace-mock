"use client"

import React from "react"
import InterviewSort from "./InterviewSort"

interface Interview {
  id: string
  role: string
  level: string
  questions: string[]
  techstack: string[]
  createdAt: string
  userId: string
  type: string
  finalized: boolean
}

interface InterviewListWrapperProps {
  children: React.ReactNode
  title: string
  hasInterviews: boolean
  interviews: Interview[]
}

const InterviewListWrapper = ({ children, title, hasInterviews }: InterviewListWrapperProps) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark-100 dark:text-light-100">{title}</h2>
        {hasInterviews && <InterviewSort />}
      </div>

      <div className="interviews-section">{children}</div>
    </section>
  )
}

export default InterviewListWrapper
