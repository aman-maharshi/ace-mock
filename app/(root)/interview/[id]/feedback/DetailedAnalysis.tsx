"use client"

import { useState } from "react"
import { Target, ChevronDown, ChevronUp } from "lucide-react"

interface CategoryScore {
  name: string
  score: number
  comment: string
}

interface DetailedAnalysisProps {
  categoryScores: CategoryScore[]
}

export const DetailedAnalysis = ({ categoryScores }: DetailedAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between w-full text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-dark-100 dark:text-light-100">Detailed Analysis</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="text-sm font-medium">{isExpanded ? "Hide Details" : "Show Details"}</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          {categoryScores.map((category, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    category.score >= 80
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : category.score >= 60
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-dark-100 dark:text-light-100">
                  {category.name} ({category.score}/100)
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{category.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
