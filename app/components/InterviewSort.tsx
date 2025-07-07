"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

type SortOption = "newest" | "oldest" | "easy" | "medium" | "hard"

interface InterviewSortProps {
  className?: string
}

const InterviewSort = ({ className }: InterviewSortProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = (searchParams.get("sort") as SortOption) || "newest"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="easy">Easy Difficulty</SelectItem>
          <SelectItem value="medium">Medium Difficulty</SelectItem>
          <SelectItem value="hard">Hard Difficulty</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default InterviewSort
