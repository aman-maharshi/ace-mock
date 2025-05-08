"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { vapi } from "@/lib/vapi.sdk"

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  console.log(userName, userId, type, "agent")
  const router = useRouter()

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])

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
        setMessages((prev) => [...prev, newMessage])
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
    if (callStatus === CallStatus.FINISHED) {
      router.push("/")
    }

  }, [messages, callStatus, type, userId])

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  // const messages = [
  //   "What is your experience with React?",
  //   "I have been working with React for over 3 years now. I have built several applications using React and have a good understanding of its core concepts.",
  // ]
  const lastMessage = messages[messages.length - 1]

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi-avatar"
              height={54}
              width={65}
              className='object-cover'
            />
            {isSpeaking && <span className='animate-speak'></span>}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
              height={540}
              width={540}
              className='object-cover rounded-full size-[120px]'
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className='transcript-border'>
          <div className="transcript">
            <p
              className={clsx('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}
              key={lastMessage}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE' ? (
          <button className='relative btn-call'>
            <span className={clsx('absolute animate-ping rounded-full opacity-75',
              callStatus !== 'CONNECTING' && 'hidden'
            )} />
            <span>{callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? "Call" : ". . ."}</span>
          </button>
        ) : (
          <button className='btn-disconnect'>
            End
          </button>
        )}
      </div>
    </>
  )
}

export default Agent