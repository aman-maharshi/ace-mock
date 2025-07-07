import { getCurrentUser } from "@/lib/actions/auth.action"
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/interview.action"
import { redirect } from "next/navigation"
import dayjs from "dayjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Medal,
  Milestone,
  ArrowLeft,
  RefreshCw,
  Trophy,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { DetailedAnalysis } from "./DetailedAnalysis"

// http://localhost:3000/interview/pLn3jrV3MIo1oYPdf2wA/feedback

const Page = async ({ params }: RouteParams) => {
  const { id } = await params

  const user = await getCurrentUser()
  const interview = await getInterviewById(id)
  // console.log(interview, "interview")

  if (!interview) redirect("/")

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!
  })

  // console.log(feedback, "feedback")

  const resultPercentage = feedback?.totalScore || 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
    return "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          asChild
        >
          <Link href={`/`}>
            <ArrowLeft className="size-6" />
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-dark-100 dark:text-light-100">Interview Feedback</h1>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400 capitalize">{interview.role} Interview</p>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-200" />
            <span>{feedback?.createdAt ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A") : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-200" />
            <span>{interview.questions.length} Questions</span>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-8">
        {/* Overall Score Card */}
        <div className="lg:col-span-3 bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#22c55e ${resultPercentage}%, #e5e7eb ${resultPercentage}% 100%)`
              }}
            />
            <div className="absolute inset-2 bg-white dark:bg-dark-200 rounded-full flex items-center justify-center">
              <div className="text-3xl font-bold text-dark-100 dark:text-light-100">{resultPercentage}%</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-dark-100 dark:text-light-100 mb-2">Overall Score</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {resultPercentage >= 80
              ? "Excellent Performance"
              : resultPercentage >= 60
              ? "Good Performance"
              : "Needs Improvement"}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-dark-100 dark:text-light-100 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {feedback?.categoryScores?.map(category => (
              <div key={category.name} className="flex items-center gap-3">
                <div className="flex-1 text-sm font-medium text-dark-100 dark:text-light-100">{category.name}</div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      category.score >= 80 ? "bg-green-500" : category.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <div className={`w-12 text-right text-sm font-bold ${getScoreColor(category.score)}`}>
                  {category.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Category Analysis */}
      {feedback?.categoryScores && feedback.categoryScores.length > 0 && (
        <DetailedAnalysis categoryScores={feedback.categoryScores} />
      )}

      {/* Detailed Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Strengths */}
        <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-100 dark:text-light-100">Strengths</h3>
          </div>
          <ul className="space-y-3">
            {feedback?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-100 dark:text-light-100">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {feedback?.areasForImprovement?.map((area, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final Assessment */}
      {feedback?.finalAssessment && (
        <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-dark-100" />
            </div>
            <h3 className="text-xl font-semibold text-dark-100 dark:text-light-100">Final Assessment</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feedback.finalAssessment}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Button className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl h-12 group/btn">
          <Link href="/" className="flex items-center gap-2 w-full justify-center">
            <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </Button>

        <Button className="flex-1 bg-gradient-to-r from-primary-200 to-primary-100 hover:from-primary-200/90 hover:to-primary-100/90 text-dark-100 font-semibold rounded-xl h-12 group/btn shadow-lg hover:shadow-xl transition-all duration-200">
          <Link href={`/interview/${id}`} className="flex items-center gap-2 w-full justify-center">
            <RefreshCw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform" />
            Retake Interview
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Page
