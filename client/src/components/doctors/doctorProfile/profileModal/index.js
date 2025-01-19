import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload' // Import FileUpload
import { useForm } from 'react-hook-form'
import { DOCTOR_PROFILE_FIELDS } from './constant'
import MzInput from '../../../../common/MzForm/MzInput'
import MzAutoComplete from '../../../../common/MzForm/MzAutoComplete'
import MzPhoneInput from '../../../../common/MzForm/MzPhoneInput'

const DoctorProfileFormModal = ({ visible, onHide, onSave, initialData }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialData || {},
  })

  const [selectedState, setSelectedState] = useState(null)
  const [cityOptions, setCityOptions] = useState([])

  const selectedStateWatcher = watch(DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.name)

  useEffect(() => {
    if (selectedState) {
      const CITY =
        DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.optionsByState[selectedState] || []
      setCityOptions(CITY)
      setValue(DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.name, null)
    }
  }, [selectedState, setValue])
  const onSubmit = async data => {
    onSave(data)
  }

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  const isLoading = false

  const handleFileUpload = e => {
    // Set the uploaded file value to the form
    const file = e.files[0]
    setValue(DOCTOR_PROFILE_FIELDS.PROFILE_IMAGE.name, file)
  }

  return (
    <Dialog
      header={`${initialData ? 'Edit' : 'Add'} Doctor Profile`}
      visible={visible}
      style={{ width: '500px' }}
      onHide={onHide}>
      <form onSubmit={handleSubmit(onSubmit)} className='p-fluid'>
        <FileUpload
          className='mb-2'
          name={DOCTOR_PROFILE_FIELDS.PROFILE_IMAGE.name}
          customUpload
          uploadHandler={handleFileUpload}
          chooseLabel='Choose Profile Image'
          accept='image/*'
          maxFileSize={1000000} // Maximum file size, adjust if needed
          onSelect={handleFileUpload}
          auto
          showUploadButton={false}
          showCancelButton={false}
        />
        {getFormErrorMessage(DOCTOR_PROFILE_FIELDS.PROFILE_IMAGE.name)}

        <MzInput
          control={control}
          name={DOCTOR_PROFILE_FIELDS.SPECIALIZATION.name}
          label={DOCTOR_PROFILE_FIELDS.SPECIALIZATION.label}
          placeholder='Enter Specialization'
          rules={DOCTOR_PROFILE_FIELDS.SPECIALIZATION.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.SPECIALIZATION.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.SPECIALIZATION.name
          )}
        />
        <MzInput
          control={control}
          name={DOCTOR_PROFILE_FIELDS.DESCRIPTION.name}
          label={DOCTOR_PROFILE_FIELDS.DESCRIPTION.label}
          placeholder='Enter Description'
          rules={DOCTOR_PROFILE_FIELDS.DESCRIPTION.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.DESCRIPTION.name]}
          errorMsg={getFormErrorMessage(DOCTOR_PROFILE_FIELDS.DESCRIPTION.name)}
        />
        <MzPhoneInput
          control={control}
          country='in'
          name={DOCTOR_PROFILE_FIELDS.CONTACT_NUMBER.name}
          label={DOCTOR_PROFILE_FIELDS.CONTACT_NUMBER.label}
          placeholder='Enter Contact Number'
          rules={DOCTOR_PROFILE_FIELDS.CONTACT_NUMBER.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.CONTACT_NUMBER.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.CONTACT_NUMBER.name
          )}
        />
        <MzInput
          control={control}
          name={DOCTOR_PROFILE_FIELDS.HOSPITAL_NAME.name}
          label={DOCTOR_PROFILE_FIELDS.HOSPITAL_NAME.label}
          placeholder='Enter Hospital Name'
          rules={DOCTOR_PROFILE_FIELDS.HOSPITAL_NAME.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.HOSPITAL_NAME.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.HOSPITAL_NAME.name
          )}
        />
        <MzInput
          control={control}
          name={DOCTOR_PROFILE_FIELDS.ADDRESS.STREET_NAME.name}
          label={DOCTOR_PROFILE_FIELDS.ADDRESS.STREET_NAME.label}
          placeholder='Enter Street Name'
          rules={DOCTOR_PROFILE_FIELDS.ADDRESS.STREET_NAME.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.ADDRESS.STREET_NAME.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.ADDRESS.STREET_NAME.name
          )}
        />
        <MzAutoComplete
          control={control}
          name={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.name}
          label={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.label}
          placeholder={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.placeholder}
          optionLabel={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.optionLabel}
          optionValue={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.optionValue}
          suggestions={DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.options}
          onChange={e => setSelectedState(e)}
          rules={{
            required: DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.rules.required,
          }}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.ADDRESS.STATES.name
          )}
          dropdown
        />
        <MzAutoComplete
          control={control}
          name={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.name}
          label={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.label}
          placeholder={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.placeholder}
          optionLabel={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.optionLabel}
          optionValue={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.optionValue}
          options={cityOptions}
          suggestions={cityOptions}
          dropdown
          disabled={!selectedStateWatcher}
          rules={DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.name]}
          errorMsg={getFormErrorMessage(DOCTOR_PROFILE_FIELDS.ADDRESS.CITY.name)}
        />
        <MzInput
          control={control}
          name={DOCTOR_PROFILE_FIELDS.ADDRESS.PINCODE.name}
          label={DOCTOR_PROFILE_FIELDS.ADDRESS.PINCODE.label}
          placeholder='Enter Pincode'
          rules={DOCTOR_PROFILE_FIELDS.ADDRESS.PINCODE.rules}
          isError={!!errors[DOCTOR_PROFILE_FIELDS.ADDRESS.PINCODE.name]}
          errorMsg={getFormErrorMessage(
            DOCTOR_PROFILE_FIELDS.ADDRESS.PINCODE.name
          )}
        />
        <Button
          type='submit'
          label='Save'
          className='mt-3 border-round-sm'
          disabled={isLoading}
        />
      </form>
    </Dialog>
  )
}

export default DoctorProfileFormModal
