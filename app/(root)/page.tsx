import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '../components/InterviewCard'

import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getOtherInterviews } from '@/lib/actions/interview.action'

const Page = async () => {

  const user = await getCurrentUser()

  // const userInterviews = await getInterviewsByUserId(user?.id!)
  // const otherInterviews = await getOtherInterviews({ userId: user?.id! })

  const [userInterviews, otherInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getOtherInterviews({ userId: user?.id! })
  ])

  // console.log('userInterviews', userInterviews)

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Mock Interivews</h2>
          <p className='text-lg'>
            Practice on real interview questions and get instant feedback.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview">Start Mock Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt='Robot'
          width={350}
          height={350}
          className='max-sm:hidden'
        />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>

          {userInterviews?.length > 0 ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}

        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take and Interview</h2>

        <div className='interviews-section'>
          {otherInterviews?.length > 0 ? (
            otherInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  )
}

export default Page