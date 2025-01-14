import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import MzAutoComplete from '../../common/MzForm/MzAutoComplete'
import { FORM_FIELDS_NAME } from './constant'
import { LOGINREGISTERBG } from '../../assets/images'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast } from 'react-toastify'

const LoginComponent = props => {
  const { formFieldValueMap, isLoading, login } = props.loginProps
  const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: useMemo(() => {
      return formFieldValueMap
    }, [formFieldValueMap]),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async data => {
    try {
      // Step 1: Attempt to sign in with Google
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // Step 2: Prepare the login payload
      const loginData = {
        email: user.email,
        name: user.displayName,
        role: data.role,
        profileImg: user.photoURL,
      }
      await login(loginData)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in process was canceled. Please try again.')
      } else {
        console.error('Google login error:', error)
        toast.error('Google login failed. Please try again.')
      }
    } 
  }

  const getFormErrorMessage = name =>
    errors[name] && <small className='p-error'>{errors[name].message}</small>
  return (
    <div className='grid grid-nogutter surface-0 text-800'>
      <div className='col-12 md:col-6 overflow-hidden hidden md:block lg:block'>
        <img
          src={LOGINREGISTERBG}
          alt='WINGROW_SLIDE_THREE'
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
                  Welcome to MediConnect
                </h1>
                <div className='text-600 mb-2'>Login with Google</div>
                <form
                  className='mt-5 p-fluid w-full'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.ROLE.name}
                    label={FORM_FIELDS_NAME.ROLE.label}
                    optionLabel={FORM_FIELDS_NAME.ROLE.optionLabel}
                    optionValue={FORM_FIELDS_NAME.ROLE.optionValue}
                    placeholder={FORM_FIELDS_NAME.ROLE.placeholder}
                    rules={FORM_FIELDS_NAME.ROLE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.ROLE.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.ROLE.name)}
                    suggestions={FORM_FIELDS_NAME.ROLE.options}
                    dropdown
                  />
                  <Button
                    type='submit'
                    label='Login with Google'
                    icon='pi pi-google'
                    className='mt-3 border-round-sm'
                    loading={isLoading}
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

export default LoginComponent
