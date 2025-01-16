import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import MzAutoComplete from '../../common/MzForm/MzAutoComplete'
import { FORM_FIELDS_NAME } from './constant'
import MzInput from '../../common/MzForm/MzInput'
import { APPOINTMENT } from '../../assets/images'
import MzCalendar from '../../common/MzForm/MzCalendar'

const BookAppointmentComponent = props => {
  const { doctors, scheduleAppointment, isLoading } = props.appointmentProps
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: useMemo(() => formFieldValueMap, [formFieldValueMap]),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?._id ?? ' '
  const dat = new Date()
  const onSubmit = async data => {
  
    console.log(data)
    const payload={
      userId: userId ?? '',
      doctorId: data.doctor,
      date:data.date,
      time:data.time,
      reason:data.reason
    }
    try {
      await scheduleAppointment(payload);
    } catch (error) {
      console.error('Error booking appointment:', error)
    }
  }

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  return (
    <div className='grid grid-nogutter surface-0 text-800'>
      <div className='col-12 md:col-6 overflow-hidden hidden md:block lg:block'>
        <img
          src={APPOINTMENT}
          alt='Appointment Background'
          className='md:ml-auto block h-full w-full'
          style={{
            clipPath: 'polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)',
          }}
        />
      </div>
      <div className='col-12 md:col-6 md:p-6 text-center flex align-items-center justify-content-center'>
        <section>
          <div className='flex flex-column align-items-center justify-content-center p-2'>
            <div
              style={{
                borderRadius: '56px',
                padding: '1rem',
                background:
                  'linear-gradient(90deg, rgba(130, 177, 255, 0.6) 30%, rgba(39, 80, 183, 0.8) 70%)',
              }}
            >
              <div
                className='w-full text-center surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center'
                style={{ borderRadius: '53px' }}
              >
                <h1 className='text-900 font-bold text-xl md:text-1xl mb-2'>
                  Book an Appointment
                </h1>
                <div className='text-600 mb-2'>
                  Please select the details for your appointment
                </div>
                <form
                  className='mt-5 p-fluid w-full'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.DOCTOR.name}
                    label={FORM_FIELDS_NAME.DOCTOR.label}
                    optionLabel={FORM_FIELDS_NAME.DOCTOR.optionLabel}
                    optionValue={FORM_FIELDS_NAME.DOCTOR.optionValue}
                    placeholder={FORM_FIELDS_NAME.DOCTOR.placeholder}
                    rules={FORM_FIELDS_NAME.DOCTOR.rules}
                    isError={!!errors[FORM_FIELDS_NAME.DOCTOR.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.DOCTOR.name)}
                    suggestions={doctors}
                    dropdown
                  />
                  <MzCalendar
                    control={control}
                    minDate={dat}
                    name={FORM_FIELDS_NAME.DATE.name}
                    label={FORM_FIELDS_NAME.DATE.label}
                    optionLabel={FORM_FIELDS_NAME.DATE.optionLabel}
                    optionValue={FORM_FIELDS_NAME.DATE.optionValue}
                    placeholder={FORM_FIELDS_NAME.DATE.placeholder}
                    rules={FORM_FIELDS_NAME.DATE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.DATE.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.DATE.name)}
                  />
                  <MzCalendar
                    control={control}
                    name={FORM_FIELDS_NAME.TIME.name}
                    label={FORM_FIELDS_NAME.TIME.label}
                    optionLabel={FORM_FIELDS_NAME.TIME.optionLabel}
                    optionValue={FORM_FIELDS_NAME.DATE.optionValue}
                    placeholder={FORM_FIELDS_NAME.TIME.placeholder}
                    rules={FORM_FIELDS_NAME.DATE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.DATE.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.DATE.name)}
                    icon={() => <i className="pi pi-clock" />}
                    timeOnly
                  />
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.REASON.name}
                    label={FORM_FIELDS_NAME.REASON.label}
                    placeholder={FORM_FIELDS_NAME.REASON.placeholder}
                    rules={FORM_FIELDS_NAME.REASON.rules}
                    isError={!!errors[FORM_FIELDS_NAME.REASON.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.REASON.name)}
                  />
                  <Button
                    type='submit'
                    label='Shedule'
                    className='mt-3 border-round-sm'
                    disabled={isLoading}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BookAppointmentComponent
