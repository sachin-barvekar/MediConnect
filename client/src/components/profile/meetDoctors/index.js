import React,{useEffect} from 'react'
import { Carousel } from 'primereact/carousel'
import { Card } from 'primereact/card'
import AOS from 'aos'

export default function RegisteredDoctors({ doctorsData }) {
    useEffect(() => {
        AOS.init({ duration: 1000 })
      }, [])
  // Carousel item template using Card component
  const doctorTemplate = (doctor) => {
    return (
      <div className="p-card p-shadow-2 m-2" data-aos="fade-up">
        <Card
          title={doctor.name}
          subTitle={doctor.specialty}
          header={
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full border-round"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          }
          className="p-mb-3 h-45rem"
        >
          <p>{doctor.description}</p>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-900 mb-4">Your Scheduled Appointments</h2>
      <Carousel
        value={doctorsData}
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
