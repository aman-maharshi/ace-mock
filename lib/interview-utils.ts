import { Code, Users2, Layers, Play } from "lucide-react"

export const getTypeStyles = (type: string) => {
  const typeLower = type?.toLowerCase() || ""

  if (typeLower.includes("technical") || typeLower.includes("tech")) {
    return {
      badge: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      card: "hover:border-blue-200 dark:hover:border-blue-200/50 hover:shadow-blue-200/10",
      overlay: "from-blue-200/5",
      icon: Code,
      gradient: "from-blue-200 to-blue-100 hover:from-blue-200/90 hover:to-blue-100/90"
    }
  } else if (typeLower.includes("behavioral") || typeLower.includes("behavior")) {
    return {
      badge:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      card: "hover:border-purple-200 dark:hover:border-purple-200/50 hover:shadow-purple-200/10",
      overlay: "from-purple-200/5",
      icon: Users2,
      gradient: "from-purple-200 to-purple-100 hover:from-purple-200/90 hover:to-purple-100/90"
    }
  } else if (typeLower.includes("mixed")) {
    return {
      badge:
        "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      card: "hover:border-orange-200 dark:hover:border-orange-200/50 hover:shadow-orange-200/10",
      overlay: "from-orange-200/5",
      icon: Layers,
      gradient: "from-orange-200 to-orange-100 hover:from-orange-200/90 hover:to-orange-100/90"
    }
  } else {
    // Default primary colors
    return {
      badge:
        "bg-primary-100 dark:bg-primary-200/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-200/30",
      card: "hover:border-primary-200 dark:hover:border-primary-200/50 hover:shadow-primary-200/10",
      overlay: "from-primary-200/5",
      icon: Play,
      gradient: "from-primary-200 to-primary-100 hover:from-primary-200/90 hover:to-primary-100/90"
    }
  }
}

export const getLevelColor = (level: string | undefined) => {
  const levelLower = level?.toLowerCase() || ""
  if (levelLower.includes("entry") || levelLower.includes("junior")) {
    return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
  } else if (levelLower.includes("mid")) {
    return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
  } else if (levelLower.includes("senior")) {
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
  }
  return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
}

export const getScoreColor = (score: number) => {
  if (score >= 80) {
    return {
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-700 dark:text-green-300"
    }
  } else if (score >= 60) {
    return {
      bg: "bg-yellow-50 dark:bg-yellow-900/10",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: "text-yellow-600 dark:text-yellow-400",
      text: "text-yellow-700 dark:text-yellow-300"
    }
  } else {
    return {
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-800",
      icon: "text-red-600 dark:text-red-400",
      text: "text-red-700 dark:text-red-300"
    }
  }
}
