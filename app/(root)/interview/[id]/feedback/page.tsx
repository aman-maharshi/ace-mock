import { getCurrentUser } from '@/lib/actions/auth.action'
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/interview.action'
import { redirect } from 'next/navigation'
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Medal, Milestone } from 'lucide-react';

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

  console.log(feedback, "feedback")

  const resultPercentage = (feedback?.totalScore || 0)

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          {/* <div className="flex items-center flex-row gap-2">
            <Medal className='h-4 w-4 text-yellow-500' />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div> */}

          <div className="flex items-center flex-row gap-2">
            <Calendar className='h-4 w-4 text-yellow-500' />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className='flex flex-col sm:flex-row items-center justify-between gap-8 w-full md:w-3/4 mx-auto'>
        <div className='flex flex-col gap-2 flex-1 w-full md:max-w-[550px]'>
          {feedback?.categoryScores?.map((category) => (
            <div key={category.name} className='flex items-center gap-4 flex-1'>
              <div className='w-[200px]'>{category.name}</div>
              <div className='bg-gray-100 flex-1 px-2 rounded-sm font-bold relative overflow-hidden'>
                <p className='relative z-10 text-center'>{category.score}%</p>
                <span className='absolute inset-0 bg-green-200' style={{ width: `${category.score}%` }}></span>
              </div>
            </div>
          ))}
        </div>

        <div className='h-40 w-40 relative'>
          <div
            className='absolute inset-0 rounded-full'
            style={{
              background: `conic-gradient(#22c55e ${resultPercentage}%, #e5e7eb ${resultPercentage}% 100%)`
            }}
          />
          <div className='absolute inset-2 bg-background rounded-full flex items-center justify-center'>
            <div className='text-5xl font-bold text-foreground'>
              {resultPercentage}%
            </div>
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons mb-8 max-w-2xl mx-auto">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default Page