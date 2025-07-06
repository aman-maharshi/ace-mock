"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormFieldInput from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { setSessionCookie, signIn, signUp } from "@/lib/actions/auth.action"
import { useState } from "react"
import ButtonLoader from "./ButtonLoader"
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight } from "lucide-react"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6)
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const formSchema = authFormSchema(type)
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "sign-up" ? "" : undefined,
      email: "",
      password: ""
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      // console.log(type, values, "values")

      if (type === "sign-up") {
        const { name, email, password } = values
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if (!result?.success) {
          toast.error(result?.message)
          return
        }

        toast.success("Account created successfully, please sign in.")
        router.push("/sign-in")
      } else {
        const { email, password } = values
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await userCredentials.user.getIdToken()

        if (!idToken) {
          toast.error("Sign in failed")
          return
        }

        const result = await signIn({
          email,
          idToken
        })

        // Redirect to the home page
        toast.success("Signed in successfully.")
        router.push("/")
      }
    } catch (error) {
      console.log("Error submitting form:", error)
      toast.error("An error occurred while submitting the form.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-dark-100 dark:text-light-100">
              {type === "sign-in" ? "Welcome back!" : "Join the community"}
            </h3>
            <p className="text-sm text-dark-100/70 dark:text-light-100/70 leading-relaxed">
              {type === "sign-in"
                ? "Sign in to continue your interview practice journey"
                : "Start practicing with AI-powered interviews and improve your skills"}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {type === "sign-up" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-100 dark:text-light-100 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    {...form.register("name")}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-200 focus:ring-4 focus:ring-primary-200/10 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-200 transition-colors" />
                </div>
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-100 dark:text-light-100 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative group">
                <input
                  {...form.register("email")}
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-200 focus:ring-4 focus:ring-primary-200/10 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                  placeholder="Enter your email address"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-200 transition-colors" />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-100 dark:text-light-100 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative group">
                <input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-white dark:bg-dark-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-200 focus:ring-4 focus:ring-primary-200/10 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-200 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 hover:from-primary-200/90 hover:via-primary-100/90 hover:to-primary-200/90 text-dark-100 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group"
              disabled={loading}
            >
              {loading ? (
                <ButtonLoader />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {type === "sign-in" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer Section */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-dark-300 text-gray-500 dark:text-gray-400">
                {type === "sign-in" ? "New to AceMock?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-primary-100 font-semibold transition-colors group"
          >
            {type === "sign-in" ? "Create an account" : "Sign in to your account"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
