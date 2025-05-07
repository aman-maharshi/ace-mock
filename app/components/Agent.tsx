"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

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