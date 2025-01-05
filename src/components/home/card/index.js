import React, { useEffect } from 'react'
import { Card } from 'primereact/card'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function WhyChooseUs({ data }) {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div>
      <h2 className='text-4xl font-semibold text-900 text-white mb-4'>
        Why Choose MediConnect?
      </h2>
      <div className='flex flex-wrap justify-content-center gap-6'>
        {data.map((item, index) => (
          <div
            key={index}
            className=' p-shadow-4 p-col-12 p-md-6 md:w-5'
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}>
            <Card title={item.title} className='p-mb-2'>
              <p>{item.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
