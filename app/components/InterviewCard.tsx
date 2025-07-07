import { Button } from "@/components/ui/button"
import { getRandomInterviewCover } from "@/lib/utils"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import TechIcons from "./TechIcons"
import { getFeedbackByInterviewId } from "@/lib/actions/interview.action"
import { Calendar, CircleCheckBig, Goal, Play, Eye, ArrowRight, Clock, Users } from "lucide-react"
import clsx from "clsx"
import { getTypeStyles, getLevelColor, getScoreColor } from "@/lib/interview-utils"

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  level,
  noOfQuestions,
  createdAt
}: InterviewCardProps) => {
  // console.log('InterviewCard', { interviewId, userId, role, type, techstack, createdAt })

  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId
        })
      : null

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY")

  const typeStyles = getTypeStyles(type)
  const TypeIcon = typeStyles.icon

  return (
    <div
      className={clsx(
        "bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl overflow-hidden group h-full flex flex-col",
        typeStyles.card
      )}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={clsx(
              "px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2",
              typeStyles.badge
            )}
          >
            <TypeIcon className="w-3 h-3" />
            {normalizedType}
          </div>

          {feedback ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
              <CircleCheckBig className="w-4 h-4" />
              Completed
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Not Attempted
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-dark-100 dark:text-light-100 mb-3 capitalize">
          {role} {role.length <= 12 && "Interview"}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{noOfQuestions} Questions</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {feedback?.finalAssessment ||
            "Practice your skills with this comprehensive interview. Get detailed feedback and improve your performance."}
        </p>

        {/* Level Badge */}
        <div className="mb-4">
          <div
            className={clsx(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
              getLevelColor(level)
            )}
          >
            {(level || "")
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        </div>

        {/* Score Display */}
        {feedback?.totalScore && (
          <div
            className={`flex justify-center items-center gap-2 mb-4 p-3 rounded-xl border ${
              getScoreColor(feedback.totalScore).bg
            } ${getScoreColor(feedback.totalScore).border}`}
          >
            <Goal className={`w-5 h-5 ${getScoreColor(feedback.totalScore).icon}`} />
            <span className={`text-sm font-semibold ${getScoreColor(feedback.totalScore).text}`}>
              Score: {feedback.totalScore}/100
            </span>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div className="px-6 pb-4">
        <TechIcons techStack={techstack} />
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 mt-auto">
        {feedback ? (
          <div className="flex gap-3">
            <Button className="flex-1 bg-primary-200 hover:bg-primary-200/80 text-dark-100 font-semibold rounded-xl h-11 group/btn">
              <Link
                href={`/interview/${interviewId}/feedback`}
                className="flex items-center gap-2 w-full justify-center"
              >
                <Eye className="w-4 h-4" />
                View Feedback
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-xl h-11 group/btn"
            >
              <Link href={`/interview/${interviewId}`} className="flex items-center gap-2 w-full justify-center">
                <Play className="w-4 h-4" />
                Retake
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            className={clsx(
              "w-full text-dark-100 font-semibold rounded-xl h-11 group/btn shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r",
              typeStyles.gradient
            )}
          >
            <Link href={`/interview/${interviewId}`} className="flex items-center gap-2 w-full justify-center">
              <Play className="w-4 h-4" />
              Start Interview
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          typeStyles.overlay
        )}
      ></div>
    </div>
  )
}

export default InterviewCard
