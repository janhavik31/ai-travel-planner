import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-10 md:mx-56 gap-9 mt-16'>
      <h1 className='font-extrabold text-[40px] md:text-[60px]
      text-center'>
        <span className='text-[#f55151]'>Discover Your Next Adventure
        with Al:</span> Personalized Itineraries
        at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel
      curator, creating custom itineraries
      tailored to your interests and budget.</p>

    <Link to={'/create-trip'}>
      <Button className=" text-md">Get Started , It's Free</Button>
    </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'>
      <blockquote className='text-3xl md:text-4xl text px-5'>
       " <span className='text-[#f55151] font-bold'>Adventure awaits!</span> Explore the world with AI-powered itineraries that match your dreams."
      </blockquote>
      <img src="/travelia.png" className='p-3 my-5 w-[500px] mx-auto' alt="" srcset="" />
    
      </div>
    </div>
  )
}

export default Hero