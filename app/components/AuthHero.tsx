import { Sparkles, Users, Target, Award, Play } from "lucide-react"
import React from "react"
import Logo from "./Logo"

const AuthHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-200/20 via-primary-100/10 to-primary-200/20 dark:from-primary-200/10 dark:via-primary-100/5 dark:to-primary-200/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center px-12 py-16">
        {/* Logo and Brand */}
        <div className="mb-12">
          <Logo />
          <h2 className="text-4xl font-bold text-dark-100 dark:text-light-100 mt-6 mb-4">Master Your Interviews</h2>
          <p className="text-lg text-dark-100/70 dark:text-light-100/70 leading-relaxed">
            Practice with AI-powered interviews and improve your skills with personalized feedback.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-100 dark:text-light-100 mb-1">Targeted Practice</h3>
              <p className="text-sm text-dark-100/70 dark:text-light-100/70">
                Practice interviews tailored to your role and experience level
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-dark-100" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-100 dark:text-light-100 mb-1">AI Interviewer</h3>
              <p className="text-sm text-dark-100/70 dark:text-light-100/70">
                Realistic AI interviewer that adapts to your responses
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-100 dark:text-light-100 mb-1">Detailed Feedback</h3>
              <p className="text-sm text-dark-100/70 dark:text-light-100/70">
                Get comprehensive feedback on your performance and areas to improve
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white/50 dark:bg-dark-200/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-3 mb-3">
            <Play className="w-5 h-5 text-success-100" />
            <span className="font-semibold text-dark-100 dark:text-light-100">Ready to start?</span>
          </div>
          <p className="text-sm text-dark-100/70 dark:text-light-100/70">
            Sign in to continue your interview practice journey and track your progress.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthHero
