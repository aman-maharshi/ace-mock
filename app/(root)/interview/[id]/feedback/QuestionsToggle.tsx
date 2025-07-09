"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Target } from "lucide-react"

interface QuestionsToggleProps {
  questions: string[]
}

export const QuestionsToggle = ({ questions }: QuestionsToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between w-full text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-dark-100 dark:text-light-100">Interview Questions</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="text-sm font-medium">{isExpanded ? "Hide Questions" : "Show Questions"}</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {questions.map((question, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center text-sm font-bold text-dark-100">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{question}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
