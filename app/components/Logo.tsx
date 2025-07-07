import { Sparkles } from "lucide-react"

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-primary-100 rounded-2xl flex items-center justify-center shadow-lg">
        <Sparkles className="w-6 h-6 text-dark-100" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-dark-100 dark:text-primary-100">AceMock</h1>
        <p className="text-sm text-dark-100/60 dark:text-light-100/60">AI Interview Practice</p>
      </div>
    </div>
  )
}

export default Logo
