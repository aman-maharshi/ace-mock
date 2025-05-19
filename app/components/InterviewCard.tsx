import { Button } from '@/components/ui/button'
import { getRandomInterviewCover } from '@/lib/utils'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import TechIcons from './TechIcons'
import { getFeedbackByInterviewId } from '@/lib/actions/interview.action'
import { Calendar, CircleCheckBig, Goal } from 'lucide-react'
import clsx from 'clsx'

const InterviewCard = async ({ interviewId, userId, role, type, techstack, level, noOfQuestions,
  createdAt }: InterviewCardProps) => {

  // console.log('InterviewCard', { interviewId, userId, role, type, techstack, createdAt })

  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
        interviewId,
        userId,
      })
      : null

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')


  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-100 dark:bg-light-600'>
            <p className='badge-text'>{normalizedType}</p>
          </div>
          {feedback ? (
            <div className='flex flex-row gap-2 items-center text-sm text-green-600 absolute top-3 left-5'>
              <CircleCheckBig className='w-4 h-4' />
              Attempted
            </div>
          ) : null}

          <h3 className='mt-5 capitalize truncate'>
            {role} {role.length <= 12 && "Interview"}
          </h3>

          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex flex-row gap-2 items-center'>
              <Calendar className='h-4 w-4 text-yellow-500' />
              <p>{formattedDate}</p>
            </div>

            {feedback?.totalScore && (
              <div className='flex flex-row gap-2 items-center'>
                <Goal className='h-4 w-4 text-yellow-500' />
                <p>{feedback?.totalScore}/100</p>
              </div>
            )}
          </div>

          <p className='line-clamp-2 mt-5'>
            {feedback?.finalAssessment || "You haven't taken this interview yet. Take it now to impove your skills."}
          </p>

          <div className='flex items-center justify-between mt-2 text-gray-500 font-medium text-sm'>
            <div className={clsx(
              'py-1 px-3 rounded-full text-gray-700',
              (level?.toLowerCase().includes('entry') || level?.toLowerCase().includes('junior')) && 'bg-green-100 text-green-700',
              level?.toLowerCase().includes('mid') && 'bg-yellow-100 text-yellow-700',
              level?.toLowerCase().includes('senior') && 'bg-red-100 text-red-700',
            )}>
              {(level || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <div>{noOfQuestions} Questions</div>
          </div>

        </div>

        <div className='flex flex-row justify-between'>
          <TechIcons techStack={techstack} />

          <Button className='btn-primary'>
            <Link
              href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}
            >
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard  