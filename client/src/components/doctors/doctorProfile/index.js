import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Panel } from 'primereact/panel'
import { PROFILE } from '../../../assets/images'
import DoctorProfileFormModal from './profileModal'

const DoctorProfile = props => {
  const { isError, addDoctorDetails, userId } = props.doctorProfileProps
  console.log(isError)
  const [modalVisible, setModalVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userName = user?.name ?? ' '
  const profilePic = user?.profileImg
  useEffect(() => {
    if (isError) {
      setModalVisible(true)
    }
  }, [isError])
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
                      }}
                    />
                  </div>
                }
              >
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
              </Panel>
            </section>
          </div>
        </div>
      </div>
      <div className='col-12 px-4 py-5 text-center'>
        {/* <RegisteredDoctors doctorsData={doctorsData} /> */}
      </div>
      {/* <DocumentUploader
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
      />
      <PatientFormModal visible={modalVisible}  onHide={handleHideModal}/> */}
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
