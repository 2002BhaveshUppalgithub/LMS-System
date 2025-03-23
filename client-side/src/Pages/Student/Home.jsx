import React from 'react'
import Hero from '../../Components/Students/Hero'
import Companies from '../../Components/Students/Companies'
import CoursesSection from '../../Components/Students/CoursesSection'
import TestimonialSection from '../../Components/Students/TestimonialSection'
import CallToAction from '../../Components/Students/CallToAction'
import Footer from '../../Components/Students/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialSection/>
      <CallToAction/>
      <Footer/>
      
    </div>
  )
}

export default Home
