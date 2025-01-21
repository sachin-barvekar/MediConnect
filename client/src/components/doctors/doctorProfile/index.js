import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Panel } from 'primereact/panel'
import { PROFILE } from '../../../assets/images'
import DoctorProfileFormModal from './profileModal'
import AppointmentCard from './appointmentCard'

const DoctorProfile = props => {
  const { isError, addDoctorDetails, userId, doctors } =
    props.doctorProfileProps
  console.log(doctors)
  const [modalVisible, setModalVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userName = user?.name ?? ' '
  const profilePic = user?.profileImg
  useEffect(() => {
    if (isError) {
      setModalVisible(true)
    }
  }, [isError])

  const handleHideModal = () => {
    setModalVisible(false)
  }
  const appointments = [
    {
      patientName: 'John Doe',
      reason: 'Regular Checkup',
      date: '2025-01-22',
      time: '10:30 AM',
      doctorName: 'Dr. Smith',
      status: 'Confirmed',
    },
    {
      patientName: 'Jane Smith',
      reason: 'Follow-up',
      date: '2025-01-23',
      time: '2:00 PM',
      doctorName: 'Dr. Brown',
      status: 'Pending',
    },
    {
      patientName: 'Michael Johnson',
      reason: 'Consultation',
      date: '2025-01-24',
      time: '11:00 AM',
      doctorName: 'Dr. Taylor',
      status: 'Completed',
    },
  ]
  return (
    <div>
      <div className='grid grid-nogutter surface-0 text-800'>
        <div className='col-12 md:col-6 overflow-hidden hidden md:block lg:block'>
          <img
            src={PROFILE}
            alt='Profile'
            className='md:ml-auto block h-full w-full'
            style={{
              clipPath: 'polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)',
            }}
          />
        </div>
        <div className='col-12  md:col-6 md:p-3 text-center flex align-items-center justify-content-center'>
          <div
            style={{
              borderRadius: '56px',
              background:
                'linear-gradient(90deg, rgba(130, 177, 255, 0.6) 30%, rgba(39, 80, 183, 0.8) 70%)',
            }}
            className='p-5'
          >
            <section>
              <Panel
                header={
                  <div className='w-29rem flex align-items-center justify-content-between'>
                    <div className='flex align-items-center mb-3'>
                      <Avatar
                        label={userName.charAt(0)}
                        icon={profilePic}
                        image={doctors?.profileImg}
                        size='xlarge'
                        shape='circle'
                        className='mr-3'
                      />
                      <div className='pt-3 text'>
                        <h3 className='text-900 font-bold'>{userName}</h3>
                        <p className='text-600'>
                          {' '}
                          {` ${doctors.address?.streetName}, ${doctors.address?.city}, ${doctors.address?.state}`}
                        </p>
                      </div>
                    </div>

                    <Button
                      icon='pi pi-user-edit'
                      className='p-button-rounded p-button-secondary bg-blue-700'
                      onClick={() => {
                        setModalVisible(true)
                      }}
                    />
                  </div>
                }
              >
                <div className='text-center'>
                  <p>
                    <strong>Hospital Name:</strong> {doctors?.hospitalName}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {doctors?.specialization}
                  </p>
                  <p>
                    <strong>Description:</strong> {doctors?.description} years
                  </p>
                  <p>
                    <strong>Contact No:</strong> {doctors?.contactNumber} years
                  </p>
                </div>
              </Panel>
            </section>
          </div>
        </div>
      </div>
      <div className='col-12 px-6 py-6 text-center'>
        <h2>Appointments</h2>
        <AppointmentCard appointments={appointments} />
      </div>
      <DoctorProfileFormModal
        visible={modalVisible}
        onHide={handleHideModal}
        userId={userId}
        addDoctorDetails={addDoctorDetails}
      />
    </div>
  )
}

export default DoctorProfile