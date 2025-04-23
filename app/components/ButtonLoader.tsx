import React from 'react'

const ButtonLoader = () => (
  <div className='flex space-x-1 justify-center items-center'>
    <span className='sr-only'>Loading...</span>
    <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
    <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
    <div className='h-2 w-2 bg-black rounded-full animate-bounce'></div>
  </div>
)

export default ButtonLoader