import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { FORM_FIELDS_NAME } from './constant'
import MzInput from '../../../common/MzForm/MzInput'
import MzAutoComplete from '../../../common/MzForm/MzAutoComplete'
import MzPhoneInput from '../../../common/MzForm/MzPhoneInput'

const PatientFormModal = ({ visible, onHide, onSave, initialData }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  
  const onSubmit = async data => {
    // Handle form submission here
    console.log(data)
  }

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  const isLoading = false

  return (
    <Dialog
      header={`${initialData ? 'Edit' : 'Add'} Patient Information`}
      visible={visible}
      style={{ width: '400px' }}
      onHide={onHide}>
      <form onSubmit={handleSubmit(onSubmit)} className='p-fluid'>
        <MzInput
          control={control}
          name={FORM_FIELDS_NAME.AGE.name}
          label={FORM_FIELDS_NAME.AGE.label}
          placeholder={FORM_FIELDS_NAME.AGE.placeholder}
          rules={FORM_FIELDS_NAME.AGE.rules}
          isError={!!errors[FORM_FIELDS_NAME.AGE.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.AGE.name)}
        />
        <MzAutoComplete
          control={control}
          name={FORM_FIELDS_NAME.GENDER.name}
          label={FORM_FIELDS_NAME.GENDER.label}
          optionLabel={FORM_FIELDS_NAME.GENDER.optionLabel}
          optionValue={FORM_FIELDS_NAME.GENDER.optionValue}
          placeholder={FORM_FIELDS_NAME.GENDER.placeholder}
          rules={FORM_FIELDS_NAME.GENDER.rules}
          isError={!!errors[FORM_FIELDS_NAME.GENDER.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.GENDER.name)}
          options={FORM_FIELDS_NAME.GENDER.options}
          suggestions={FORM_FIELDS_NAME.GENDER.options}
          dropdown
        />
        <MzInput
          control={control}
          name={FORM_FIELDS_NAME.HEIGHT.name}
          label={FORM_FIELDS_NAME.HEIGHT.label}
          placeholder={FORM_FIELDS_NAME.HEIGHT.placeholder}
          rules={FORM_FIELDS_NAME.HEIGHT.rules}
          isError={!!errors[FORM_FIELDS_NAME.HEIGHT.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.HEIGHT.name)}
        />
        <MzInput
          control={control}
          name={FORM_FIELDS_NAME.WEIGHT.name}
          label={FORM_FIELDS_NAME.WEIGHT.label}
          placeholder={FORM_FIELDS_NAME.WEIGHT.placeholder}
          rules={FORM_FIELDS_NAME.WEIGHT.rules}
          isError={!!errors[FORM_FIELDS_NAME.WEIGHT.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.WEIGHT.name)}
        />
        <MzAutoComplete
          control={control}
          name={FORM_FIELDS_NAME.BLOOD_GROUP.name}
          label={FORM_FIELDS_NAME.BLOOD_GROUP.label}
          optionLabel={FORM_FIELDS_NAME.BLOOD_GROUP.optionLabel}
          optionValue={FORM_FIELDS_NAME.BLOOD_GROUP.optionValue}
          placeholder={FORM_FIELDS_NAME.BLOOD_GROUP.placeholder}
          rules={FORM_FIELDS_NAME.BLOOD_GROUP.rules}
          isError={!!errors[FORM_FIELDS_NAME.BLOOD_GROUP.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.BLOOD_GROUP.name)}
          options={FORM_FIELDS_NAME.BLOOD_GROUP.options}
          dropdown
        />
        <MzPhoneInput
          control={control}
          country='in'
          name={FORM_FIELDS_NAME.CONTACT.name}
          label={FORM_FIELDS_NAME.CONTACT.label}
          placeholder={FORM_FIELDS_NAME.CONTACT.placeholder}
          rules={FORM_FIELDS_NAME.CONTACT.rules}
          isError={!!errors[FORM_FIELDS_NAME.CONTACT.name]}
          errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.CONTACT.name)}
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

export default PatientFormModal