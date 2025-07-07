import { getInterviewById } from "@/lib/actions/interview.action"
import { getRandomInterviewCover } from "@/lib/utils"
import { redirect } from "next/navigation"
import Image from "next/image"
import Agent from "@/app/components/Agent"
import { getCurrentUser } from "@/lib/actions/auth.action"
import DisplayTechIcons from "@/app/components/DisplayTechIcons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params

  const user = await getCurrentUser()
  const interview = await getInterviewById(id)

  if (!interview) redirect("/")

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-2 items-center">
            {/* <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            /> */}
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              asChild
            >
              <Link href={`/`}>
                <ArrowLeft className="size-6" />
              </Link>
            </Button>
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="bg-light-100 dark:bg-dark-200 px-4 py-2 rounded-lg h-fit">{interview.type}</p>
          <p className="bg-light-100 dark:bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">{interview.level}</p>
        </div>
      </div>

      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        // feedbackId={feedback?.id}
      />
    </>
  )
}

export default InterviewDetails
