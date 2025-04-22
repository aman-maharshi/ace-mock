'use server'

import { auth, db } from "@/firebase/admin"

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