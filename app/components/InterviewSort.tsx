"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Code, Users2, Layers, Grid3X3 } from "lucide-react"

type SortOption = "newest" | "oldest" | "easy" | "medium" | "hard"
type FilterType = "all" | "technical" | "behavioral" | "mixed"

interface InterviewSortProps {
  className?: string
}

const InterviewSort = ({ className }: InterviewSortProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = (searchParams.get("sort") as SortOption) || "newest"
  const currentFilter = (searchParams.get("filter") as FilterType) || "all"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  const handleFilterChange = (filter: FilterType) => {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === "all") {
      params.delete("filter")
    } else {
      params.set("filter", filter)
    }
    router.push(`?${params.toString()}`)
  }

  const filterOptions = [
    { value: "all", label: "All", icon: Grid3X3 },
    { value: "technical", label: "Technical", icon: Code },
    { value: "behavioral", label: "Behavioral", icon: Users2 },
    { value: "mixed", label: "Mixed", icon: Layers }
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {filterOptions.map(option => {
          const Icon = option.icon
          const isActive = currentFilter === option.value
          return (
            <Button
              key={option.value}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => handleFilterChange(option.value as FilterType)}
              className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                isActive
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              <Icon className="w-3 h-3" />
              {option.label}
            </Button>
          )
        })}
      </div>

      {/* Sort Dropdown */}
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
