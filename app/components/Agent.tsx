import { Span } from 'next/dist/trace';
import Image from 'next/image';
import React from 'react'

const Agent = ({ userName, userId, type }: AgentProps) => {
  const isSpeaking = true

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
    </>
  )
}

export default Agent