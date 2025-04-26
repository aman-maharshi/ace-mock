'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7

export const signUp = async (params: SignUpParams) => {
  const { uid, name, email, password } = params

  try {
    const userRecord = await db.collection('users').doc(uid).get()

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists',
      }
    }
    await db.collection('users').doc(uid).set({
      name, email
    })

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
    }

  } catch (error: any) {
    console.log('Error creating a user', error)

    if (error.code === 'auth/email-already-in-use') {
      return {
        success: false,
        message: 'The email address is already in use by another account.',
      }
    }

    return {
      success: false,
      message: 'Failed to create a user',
    }

  }
}

export const signIn = async (params: SignInParams) => {
  const { email, idToken } = params

  try {
    const userRecord = await auth.getUserByEmail(email)

    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account."
      }

    await setSessionCookie(idToken)
  } catch (error: any) {
    console.log("Error signing in:", error)

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    }
  }
}

export const signOut = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("session")
}

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies()

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  })

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax"
  })
}

export const getCurrentUser = async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value

  if (!sessionCookie) {
    return null
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)
    const userRecord = await db.collection('users').doc(decodedClaims.uid).get()

    if (!userRecord.exists) {
      return null
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User

  } catch (error) {
    console.log("Error getting current user:", error)
    return null
  }
}

export const isAuthenticated = async () => {
  const user = await getCurrentUser()
  return !!user
}