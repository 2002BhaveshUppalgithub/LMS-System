import React, { useContext } from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'

const TestimonialSection = () => {
    const {calculateRating}=useContext(AppContext)
  return (
    <div className='pb-14 px-8 md:px-0 text-center mt-10 md:mt-16'>
  <h1 className='text-3xl font-medium text-gray-800'>Testimonials</h1>
  <p className='md:text-base text-gray-500 mt-3'>
    Hear from our Leaders as they share journeys of transformation, success, and how
    <br /> our platform has made a difference in their lives.
  </p>

  {/* Centering and Reducing Grid Width */}
  <div className='flex justify-center mt-14'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%] lg:w-[70%]'>
      {dummyTestimonial.map((testimonial, index) => (
        <div
          key={index}
          className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5'
        >
          <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
            <img className='h-12 w-12 rounded-full' src={testimonial.image} alt="User" />
            <div>
              <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
              <p className='text-gray-800/80'>{testimonial.role}</p>
            </div>
          </div>

          <div className='p-5 pb-7'>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <img className='h-5'
                  key={i} 
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                  alt="star"
                />
              ))}
            </div>
            <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
          </div>
          <a className='text-blue-500 underline px-5' href='#'>Read more</a>
        </div>
      ))}
    </div>
  </div>
</div>

  


  )
}

export default TestimonialSection
