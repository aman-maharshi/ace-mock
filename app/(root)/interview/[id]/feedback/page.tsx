import { getCurrentUser } from '@/lib/actions/auth.action'
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/interview.action'
import { redirect } from 'next/navigation'
import React from 'react'

// http://localhost:3000/interview/pLn3jrV3MIo1oYPdf2wA/feedback

const Page = async ({ params }: RouteParams) => {
  const { id } = await params

  const user = await getCurrentUser()
  const interview = await getInterviewById(id)
  // console.log(interview, "interview")

  if (!interview) redirect("/")

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  })

  // console.log(feedback, "feedback") 

  return (
    <div>Feedback</div>
  )
}

export default Page