import React, {useEffect} from 'react'
import { Button } from 'primereact/button'
import { connect } from 'react-redux'
import SliderComponent from '../../components/home/slider'
import { fetchDoctors } from '../../redux/action/doctors/doctors'
import {
  MEDICONNECTSLIDE1,
  MEDICONNECTSLIDE2,
  MEDICONNECTSLIDE3,
} from '../../assets/images'
import KeyFeatureCompnent from '../../components/home/keyFeature'
import WhyChooseUs from '../../components/home/card'
import RegisteredDoctors from '../../components/home/meetDoctors'
import { useNavigate } from 'react-router-dom'

const HomeScreen = props => {
  const { doctors, fetchDoctors } = props
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const handleNavigation = () => {
    const route = isLoggedIn
      ? role === 'patient'
        ? '/nearby-hospital'
        : role === 'doctor'
        ? '/view'
        : '/'
      : '/login'
    navigate(route)
  }
  useEffect(() => {
    fetchDoctors()
    // eslint-disable-next-line
  }, [])

  const doctorsProps = {
    doctors
  }
  const slides = [
    {
      id: 1,
      name: 'slide1',
      url: MEDICONNECTSLIDE1,
      isImage: true,
    },
    {
      id: 2,
      name: 'slide2',
      url: MEDICONNECTSLIDE2,
      isImage: true,
    },
    {
      id: 3,
      name: 'slide3',
      url: MEDICONNECTSLIDE3,
      isImage: true,
    },
  ]
  const features = [
    { title: 'Appointments Scheduling' },
    { title: 'Nearby Hospital Locator' },
    { title: 'Easy Access to Healthcare' },
    { title: 'Prescription Management' },
    { title: 'Health Records Management' },
    { title: 'Doctor Profile Management' },
    { title: 'Emergency Assistance' },
    { title: 'Healthcare Analytics' },
  ]

  const whychooseus = [
    {
      title: 'Nearby Hospital Locator',
      description:
        'patients can easily find nearby hospitals and healthcare facilities based on their current location.',
    },
    {
      title: 'Reliability',
      description:
        'With our secure platform, you can be assured of reliable healthcare access anytime.',
    },
    {
      title: 'Comprehensive Network',
      description:
        'We offer a vast network of doctors and health specialists to meet all your needs.',
    },
    {
      title: '24/7 Support',
      description:
        'Our support team is available round the clock to assist with your health concerns.',
    },
  ]

  return (
    <div>
      <section
        className='hero-section surface-0 text-900 flex flex-column align-items-center justify-content-center'
        id='hero'>
        <div className='text-center m-6'>
          <h1 className='text-6xl font-bold mb-2 text-primary'>
            Welcome to MediConnect
          </h1>
          <p className='text-2xl mb-2 text-gray-600'>
            Your health, our priority.
          </p>
          <Button
            label='Get Started'
            className='p-button-lg p-button-rounded'
            onClick={handleNavigation}
          />
        </div>
        <SliderComponent slides={slides} />
      </section>

      {/* Key Features Section */}
      <section className='key-features-section surface-card p-4 mb-10 bg-gradient-to-r from-indigo-500 to-blue-400'>
        <div className='px-2 md:p-4 p-2  w-full overflow-scroll'>
          <KeyFeatureCompnent features={features} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='why-choose-us-section surface-0 text-center p-6 mb-10 bg-primary'>
        <WhyChooseUs data={whychooseus} />
      </section>

      <section className='registered-doctors-section text-center p-1 mt-4 mb-2 mb-10 md:p-4'>
        <RegisteredDoctors doctorsProps={doctorsProps} />
      </section>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: () => dispatch(fetchDoctors())
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    doctors: state.doctorsReducer?.doctors || [],
    isPageLevelError: state.doctorsReducer?.isPageLevelError,
    isLoading: state.doctorsReducer?.isLoading,
    isFetchSuccess: state.doctorsReducer?.isFetchSuccess,
    isFetchError: state.doctorsReducer?.isFetchError,
    error: state.doctorsReducer?.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
