import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='w-full flex flex-col items-center space-y-6 mt-16'>
            <p className='text-gray-600 text-sm md:text-base font-bold'>Trusted by learners from</p>
            <div className='flex flex-wrap justify-center gap-6 md:gap-10'>
                <img className='w-16 md:w-24' src={assets.microsoft_logo} alt='Microsoft'/>
                <img className='w-16 md:w-24' src={assets.accenture_logo} alt='Accenture'/>
                <img className='w-16 md:w-24' src={assets.adobe_logo} alt='Adobe'/>
                <img className='w-16 md:w-24' src={assets.walmart_logo} alt='Walmart'/>
                <img className='w-16 md:w-24' src={assets.paypal_logo} alt='PayPal'/>
            </div>
        </div>
  )
}

export default Companies
