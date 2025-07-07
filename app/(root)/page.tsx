import InterviewCard from "../components/InterviewCard"
import InterviewSort from "../components/InterviewSort"
import { getCurrentUser } from "@/lib/actions/auth.action"
import {
  getInterviewsByUserId,
  getOtherInterviews,
  sortInterviews,
  filterInterviewsByType
} from "@/lib/actions/interview.action"

const Page = async ({ searchParams }: { searchParams: Promise<{ sort?: string; filter?: string }> }) => {
  const user = await getCurrentUser()

  // const userInterviews = await getInterviewsByUserId(user?.id!)
  // const otherInterviews = await getOtherInterviews({ userId: user?.id! })

  const [userInterviews, otherInterviews, params] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getOtherInterviews({ userId: user?.id! }),
    searchParams
  ])

  // Get filter and sort parameters
  const sortBy = (params.sort as "newest" | "oldest" | "easy" | "medium" | "hard") || "newest"
  const filterBy = (params.filter as "all" | "technical" | "behavioral" | "mixed") || "all"

  // First filter by type, then sort
  const filteredUserInterviews = await filterInterviewsByType({
    interviews: userInterviews || [],
    type: filterBy
  })
  const filteredOtherInterviews = await filterInterviewsByType({
    interviews: otherInterviews || [],
    type: filterBy
  })

  const sortedUserInterviews = await sortInterviews({
    interviews: filteredUserInterviews.filteredInterviews || [],
    sortBy
  })
  const sortedOtherInterviews = await sortInterviews({
    interviews: filteredOtherInterviews.filteredInterviews || [],
    sortBy
  })

  // console.log('userInterviews', userInterviews)

  return (
    <>
      <section className="flex items-center justify-end">
        {/* <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Create an Interview</Link>
        </Button> */}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2>Your Interviews</h2>
          {userInterviews && userInterviews.length > 0 && <InterviewSort />}
        </div>

        <div className="interviews-section">
          {sortedUserInterviews.sortedInterviews?.length && sortedUserInterviews.sortedInterviews?.length > 0 ? (
            sortedUserInterviews.sortedInterviews?.map(interview => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                level={interview.level}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                noOfQuestions={interview.questions.length}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <div className="flex items-center justify-between">
          <h2>Other Interviews</h2>
          {/* {otherInterviews && otherInterviews.length > 0 && <InterviewSort />} */}
        </div>

        <div className="interviews-section">
          {sortedOtherInterviews.sortedInterviews?.length && sortedOtherInterviews.sortedInterviews?.length > 0 ? (
            sortedOtherInterviews.sortedInterviews?.map(interview => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                level={interview.level}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                noOfQuestions={interview.questions.length}
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
