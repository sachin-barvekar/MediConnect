import React from 'react'
import { Button } from 'primereact/button'

const Footer = () => {
  const iconList = [
    {
      id: 0,
      icon: 'pi pi-facebook',
      severity: 'info',
      ariaLabel: 'fb',
      link: '',
    },
    {
      id: 1,
      icon: 'pi pi-instagram',
      severity: 'danger',
      ariaLabel: 'insta',
      link: '',
    },
    {
      id: 2,
      icon: 'pi pi-linkedin',
      severity: 'info',
      ariaLabel: 'ld',
      link: '',
    },
    {
      id: 3,
      icon: 'pi pi-github',
      severity: 'secondary',
      ariaLabel: 'gh',
      link: '',
    },
  ]

  return (
    <>
      <div className='w-full md:px-8 footer-back'>
        <div className='w-full md:p-4 px-3'>
          <div className='w-full md:col-4 mb-2 p-1 text-center'>
            <div className='font-bold text-red-600 '>About Us</div>
            <p className='text-white'>
              At MediConnect, we simplify healthcare by connecting patients with
              doctors and hospitals through secure health record storage,
              real-time hospital locators, and seamless appointment scheduling.
              <br />
              <b>Your health, our priority.</b>
            </p>
            <div className='text-center flex justify-content-center gap-2'>
              {iconList.map(icon => (
                <Button
                  key={icon.id}
                  icon={icon.icon}
                  onClick={() => window.open(icon.link, '_blank')}
                  className='bg-white border-round-md border-'
                  outlined
                  raised
                  severity={icon.severity}
                  aria-label={icon.ariaLabel}
                />
              ))}
            </div>
          </div>
          <div className='text-center text-xs font-bold mb-0 w-full'>
            &copy; Designed & Developed by Team TechThinker.
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
