import React, { useEffect } from 'react'
import { Image } from 'primereact/image'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { LOGINREGISTERBG } from '../../../assets/images'

export default function KeyFeatureCompnent({ features }) {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <>
      <div className='mb-2 text-center w-full'>
        <h2>Key Features</h2>
        <div className='md:flex flex-row align-items-center justify-content-center md:justify-content-between text-white'>
          <div className='flex-column align-items-center w-full'>
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className='flex gap-3 mb-3 align-items-center'
                data-aos='fade-left'>
                <div className='bg-primary p-3 w-full text-lg border-round-3xl flex-column'>
                  {feature.title}
                </div>
                <div className='bg-red-400 border-round-3xl text-center p-3'>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className='flex align-items-center justify-content-center w-full'>
            <Image src={LOGINREGISTERBG} alt='Center' width='300' />
          </div>
          <div className='flex-column align-items-center w-full'>
            {features.slice(4, 8).map((feature, index) => (
              <div
                key={index + 4}
                className='flex gap-3 mb-3 align-items-center'
                data-aos='fade-right'>
                <div className='bg-primary p-3 w-full text-lg border-round-3xl flex-column'>
                  {feature.title}
                </div>
                <div className='bg-red-400 border-round-3xl text-center p-3'>
                  {index + 5}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
