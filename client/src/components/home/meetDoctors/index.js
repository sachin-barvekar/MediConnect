import React, { useEffect } from 'react'
import { Carousel } from 'primereact/carousel'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import AOS from 'aos'

export default function RegisteredDoctors(props) {
  const { doctors } = props.doctorsProps
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const doctorTemplate = doctor => {
    return (
      <div className='p-card p-shadow-2 m-2' data-aos='fade-up'>
        <Card
          key={doctor.id}
          className='shadow-2 p-4 pb-1'
          header={
            <img
              src={doctor?.additionalDetails?.profileImg}
              alt={doctor.name}
              height={250}
              className='w-full h-8 object-cover rounded-t-lg'
            />
          }>
          <div className='text-center'>
            <h3 className='text-lg font-bold mb-2'>{doctor.name}</h3>
            <p className='mb-1 text-gray-500'>
              {doctor?.additionalDetails?.specialization}
            </p>
            <p className='mb-2 text-gray-400'>
              {doctor?.additionalDetails?.hospitalName}
            </p>
            <p className='mb-2 text-gray-400'>
              {doctor?.additionalDetails?.address?.streetName +
                ', ' +
                doctor?.additionalDetails?.address?.city +
                ', ' +
                doctor?.additionalDetails?.address?.state}
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-4xl font-semibold text-900 mb-4'>
        Meet Our Registered Doctors
      </h2>
      <Carousel
        value={doctors}
        itemTemplate={doctorTemplate}
        numVisible={3}
        circular
        autoplay
        showIndicators={false}
        interval={3000}
        responsiveOptions={[
          {
            breakpoint: '1024px',
            numVisible: 2,
          },
          {
            breakpoint: '600px',
            numVisible: 1,
          },
        ]}
      />
    </div>
  )
}
