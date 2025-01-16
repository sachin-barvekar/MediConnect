import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { TabView, TabPanel } from 'primereact/tabview'
import { Avatar } from 'primereact/avatar'
import { Panel } from 'primereact/panel'
import { PROFILE } from '../../assets/images'
import RegisteredDoctors from './meetDoctors/index'
import DocumentUploader from './documents'
import PatientFormModal from './editProfile'

const MyAppointmentsList = () => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userName = user?.name ?? ' '
  const profilePic = user?.profileImg
  console.log(profilePic)
  const dummyPatientData = {
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    height: '5ft 10in',
    weight: '70kg',
    bloodGroup: 'O+',
    contact: '+1 123 456 7890',
    address: '123 Main Street, Springfield, USA',
  }

  const dummyAppointments = [
    {
      doctorName: 'Dr. John Doe',
      date: '2025-01-15',
      time: '10:30 AM',
      description: 'General check-up appointment with Dr. John.',
    },
    {
      doctorName: 'Dr. Alice Smith',
      date: '2025-01-18',
      time: '2:00 PM',
      description: 'Follow-up on lab results and prescription update.',
    },
  ]

  const dummyPrescriptions = [
    {
      date: '2025-01-10',
      doctorName: 'Dr. John Doe',
      medicines: [
        'Paracetamol 500mg - 2 times a day',
        'Ibuprofen 200mg - 1 time a day',
      ],
      notes: 'Take medications after food and stay hydrated.',
    },
    {
      date: '2025-01-18',
      doctorName: 'Dr. Alice Smith',
      medicines: ['Vitamin D 1000 IU - 1 time a day'],
      notes: 'Continue regular exercise and follow up after two weeks.',
    },
  ]

  const doctorsData = [
    {
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      image:
        'https://ghealth121.com/wp-content/uploads/2021/03/Dr.-Pooja-Aggarwal.jpg',
      description: 'Experienced Cardiologist with over 10 years of practice.',
    },
    {
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      image:
        'https://www.asterhospitals.in/sites/default/files/2023-06/Dr.%20Roma%20Paul.jpeg',
      description: 'Specialized in skin diseases and cosmetic dermatology.',
    },
    {
      name: 'Dr. Michael Johnson',
      specialty: 'Pediatrician',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHVSER0_GUksH9iq399jMq9lGre4-3PFGJa1HpK3OZz5zWSaFMdKdVKW4_NkAUwyxlPOs&usqp=CAU',
      description: 'Pediatrician specializing in child health.',
    },
  ]
  const handleHideModal = () => {
    setModalVisible(false)
  }
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
            className='p-5'>
            <section>
              <Panel
                header={
                  <div className='w-29rem flex align-items-center justify-content-between'>
                    <div className='flex align-items-center mb-3'>
                      <Avatar
                        label={userName.charAt(0)}
                        icon={profilePic}
                        image={profilePic}
                        size='xlarge'
                        shape='circle'
                        className='mr-3'
                      />
                      <div className='pt-3 text'>
                        <h3 className='text-900 font-bold'>{userName}</h3>
                        <p className='text-600'>{dummyPatientData.address}</p>
                      </div>
                    </div>

                    <Button
                      icon='pi pi-user-edit'
                      className='p-button-rounded p-button-secondary bg-blue-700'
                      onClick={() => {
                        setModalVisible(true)
                      }
                    }
                    />
                  </div>
                }>
                <div className='text-center'>
                  <p>
                    <strong>Age:</strong> {dummyPatientData.age} years
                  </p>
                  <p>
                    <strong>Gender:</strong> {dummyPatientData.gender}
                  </p>
                  <p>
                    <strong>Height:</strong> {dummyPatientData.height}
                  </p>
                  <p>
                    <strong>Weight:</strong> {dummyPatientData.weight}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {dummyPatientData.bloodGroup}
                  </p>
                  <p>
                    <strong>Contact:</strong> {dummyPatientData.contact}
                  </p>
                </div>
                <div className='mt-4 text-center'>
                  <Button
                    label='Uploaded Document'
                    icon='pi pi-eye'
                    className='p-button-rounded bg-blue-700 mr-2'
                    onClick={() => {
                      setDialogVisible(true)
                    }}
                  />
                </div>
              </Panel>
            </section>
          </div>
        </div>
      </div>
      <div className='col-12 px-4 py-5 text-center'>
        <RegisteredDoctors doctorsData={doctorsData} />
      </div>
      <DocumentUploader
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
      />
      <PatientFormModal visible={modalVisible}  onHide={handleHideModal}/>
    </div>
  )
}

export default MyAppointmentsList
