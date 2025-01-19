import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useNavigate } from 'react-router-dom'
import MzAutoComplete from '../../common/MzForm/MzAutoComplete'
import { FORM_FIELDS } from './constant'
import { ROUTE_PATH } from '../../constant/urlConstant'

const DoctorsComponent = props => {
  const { doctors } = props.doctorsProps
  const navigate = useNavigate()

  const [selectedState, setSelectedState] = useState(null)
  const [cityOptions, setCityOptions] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState(doctors || [])

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const selectedStateWatcher = watch(FORM_FIELDS.STATES.name)

  useEffect(() => {
    if (selectedState) {
      const cities = FORM_FIELDS.CITIES.optionsByState[selectedState] || []
      setCityOptions(cities)
      setValue(FORM_FIELDS.CITIES.name, null)
    }
  }, [selectedState, setValue])

  const handleScheduleAppointment = doctor => {
    navigate(`${ROUTE_PATH.PATIENT.APPOINTMENT}`, {
      state: {
        doctor,
      },
    })
  }

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  const onSearchDoctors = data => {
    const { state, city } = data
    const filtered = doctors.filter(
      doctor =>
        (!state || doctor.state === state.label) &&
        (!city || doctor.city === city.label)
    )
    setFilteredDoctors(filtered)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSearchDoctors)}>
        <div className='p-2 mt-4 flex gap-6 justify-content-center align-items-center'>
          <div className='w-4'>
            <MzAutoComplete
              control={control}
              name={FORM_FIELDS.STATES.name}
              label={FORM_FIELDS.STATES.label}
              placeholder={FORM_FIELDS.STATES.placeholder}
              optionLabel={FORM_FIELDS.STATES.optionLabel}
              optionValue={FORM_FIELDS.STATES.optionValue}
              options={FORM_FIELDS.STATES.options}
              suggestions={FORM_FIELDS.STATES.options}
              value={selectedState}
              onChange={e => setSelectedState(e)}
              rules={FORM_FIELDS.STATES.rules}
              isError={!!errors[FORM_FIELDS.STATES.name]}
              errorMsg={getFormErrorMessage(FORM_FIELDS.STATES.name)}
            />
          </div>
          <div className='w-4'>
            <MzAutoComplete
              control={control}
              name={FORM_FIELDS.CITIES.name}
              label={FORM_FIELDS.CITIES.label}
              placeholder={FORM_FIELDS.CITIES.placeholder}
              optionLabel={FORM_FIELDS.CITIES.optionLabel}
              optionValue={FORM_FIELDS.CITIES.optionValue}
              options={cityOptions}
              suggestions={cityOptions}
              dropdown
              disabled={!selectedStateWatcher}
              rules={FORM_FIELDS.CITIES.rules}
              isError={!!errors[FORM_FIELDS.CITIES.name]}
              errorMsg={getFormErrorMessage(FORM_FIELDS.CITIES.name)}
            />
          </div>
        </div>
        <div className='text-center'>
          <Button
            icon='pi pi-search'
            label='Search Doctors'
            className='p-button-primary'
            rounded
            type='submit'
          />
        </div>
      </form>
      <div className='m-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {filteredDoctors.map(doctor => (
            <Card
              key={doctor.id}
              className='shadow-2 p-4'
              header={
                <img
                  src={doctor.profileImg}
                  alt={doctor.name}
                  className='w-full h-48 object-cover rounded-t-lg'
                />
              }>
              <div className='text-center'>
                <h3 className='text-lg font-bold mb-2'>{doctor.name}</h3>
                <p className='mb-1 text-gray-500'>{doctor.specialization}</p>
                <p className='mb-4 text-gray-400'>
                  {doctor.address || 'Address not available'}
                </p>
                <Button
                  label='Schedule Appointment'
                  className='p-button-primary w-full'
                  onClick={() => handleScheduleAppointment(doctor)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorsComponent
