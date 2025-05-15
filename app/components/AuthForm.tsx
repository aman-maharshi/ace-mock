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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client"
import { setSessionCookie, signIn, signUp } from "@/lib/actions/auth.action"
import { useState } from "react"
import ButtonLoader from "./ButtonLoader"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false)
  const formSchema = authFormSchema(type)
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "sign-up" ? "" : undefined,
      email: "",
      password: "",
    },
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
          password,
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
          email, idToken
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
    <div className="card-border lg:min-w-[500px] relative overflow-hidden">
      <div className='absolute top-0 right-0 w-fit px-6 py-3 rounded-bl-2xl font-bold bg-light-100 dark:bg-light-600'>
        <p className='badge-text'>{type === "sign-in" ? "Sign in" : "Sign up"}</p>
      </div>

      <div className="flex flex-col gap-4 card p-10">
        <div className="flex flex-row gap-2 justify-center">
          {/* <Image
            src="/logo.svg"
            alt="Logo"
            height={32}
            width={38}
          /> */}
          <h2 className="text-dark-100 dark:text-primary-100">AceMock</h2>
        </div>
        <h3 className="text-center">Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >

            {type === "sign-up" && (
              <FormFieldInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
                type="text"
              />
            )}
            <FormFieldInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormFieldInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {loading ? <ButtonLoader /> : (
                type === "sign-in" ? "Sign in" : "Create an Account"
              )}
            </Button>
          </form>

          <p className="text-center text-dark-100 dark:text-light-100">
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-primary ml-1"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default AuthForm