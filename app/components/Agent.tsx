"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { vapi } from "@/lib/vapi.sdk"
import { interviewer } from "@/constants"
import ButtonLoader from "./ButtonLoader"
import { createFeedback } from "@/lib/actions/interview.action"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED"
}

const Agent = ({ userName, userId, type, interviewId, questions }: AgentProps) => {
  // console.log(userName, userId, type, "agent")

  const router = useRouter()

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const [lastMessage, setLastMessage] = useState<string>("")
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)

  // VAPI LISTENERS AND HANDLERS
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE)
    }

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED)
    }

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages(prev => [...prev, newMessage])
      }
    }

    const onSpeechStart = () => {
      console.log("speech start")
      setIsSpeaking(true)
    }

    const onSpeechEnd = () => {
      console.log("speech end")
      setIsSpeaking(false)
    }

    const onError = (error: Error) => {
      console.log("Error:", error)
    }

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)
    vapi.on("error", onError)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
      vapi.off("error", onError)
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content)
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      setIsGeneratingFeedback(true)

      try {
        const { success, feedbackId: id } = await createFeedback({
          interviewId: interviewId!,
          userId: userId!,
          transcript: messages
        })

        if (success && id) {
          router.push(`/interview/${interviewId}/feedback`)
          // http://localhost:3000/interview/pLn3jrV3MIo1oYPdf2wA/feedback
        } else {
          console.log("Error saving feedback")
          router.push("/")
        }
      } catch (error) {
        console.error("Error generating feedback:", error)
        router.push("/")
      } finally {
        setIsGeneratingFeedback(false)
      }
    }

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/")
      } else {
        handleGenerateFeedback(messages)
      }
    }
  }, [messages, callStatus, type, userId])

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId
        }
      })
    } else {
      // If not generate, then make vapi ask from the list of questions
      let formattedQuestions = ""
      if (questions) {
        formattedQuestions = questions.map(question => `- ${question}`).join("\n")
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions
        }
      })
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi-avatar" height={54} width={65} className="object-cover" />
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <h3 className="text-dark-100 dark:text-light-100">AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
              height={540}
              width={540}
              className="object-cover rounded-full size-[120px]"
            />
            <h3 className="text-dark-100 dark:text-light-100">{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              className={clsx("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}
              key={lastMessage}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {isGeneratingFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="flex space-x-1 justify-center items-center">
              <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Generating your feedback...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Please wait while we analyze your interview and create detailed feedback.
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span
              className={clsx("absolute animate-ping rounded-full opacity-75", callStatus !== "CONNECTING" && "hidden")}
            />
            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? (
                "Call"
              ) : (
                <div className="py-1">
                  <ButtonLoader />
                </div>
              )}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  )
}

export default Agent
