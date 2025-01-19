import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../constant/urlConstant'
import { Sidebar } from 'primereact/sidebar'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { toast } from 'react-toastify'
import './index.css'
import { useDispatch } from 'react-redux'
import { init_login } from '../../redux/action/auth/login'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const verified = localStorage.getItem('isLoggedIn')
  const [visible, setVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userName = user?.name ?? ' '
  const profilePic = user?.profileImg
  const handleNavigation = route => {
    navigate(route)
    setVisible(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    dispatch(init_login())
    navigate(ROUTE_PATH.BASE.HOME)
    toast.success('Logout Successfully')
  }
  const sidebarItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home', route: ROUTE_PATH.BASE.HOME },
    verified &&
      role === 'patient' && {
        label: 'Nearby Hospitals',
        icon: 'pi pi-fw pi-map-marker',
        route: ROUTE_PATH.PATIENT.NEARBYHOSPITAL,
      },
    verified &&
      role === 'patient' && {
        label: 'Doctors',
        icon: 'pi pi-fw pi-calendar-clock',
        route: ROUTE_PATH.PATIENT.DOCTOR,
      },
      verified &&
      role === 'patient' && {
        label: 'Profile',
        icon: 'pi pi-user',
        route: ROUTE_PATH.PATIENT.DATA,
      },

    !verified && {
      label: 'Login',
      icon: 'pi pi-fw pi-user',
      route: ROUTE_PATH.BASE.LOGIN,
      visible: !verified,
    },
    verified && {
      label: 'Logout',
      icon: 'pi pi-power-off p-error',
      command: handleLogout,
    },
  ].filter(Boolean)

  const start = (
    <div className='m-2'>
      <h3 className='text-white logo'>MediConnect</h3>
    </div>
  )

  const end = (
    <div className='flex gap-2'>
      <Button
        label={'Home'}
        icon='pi pi-home'
        text
        className='text-white no-outline font-bold rounded'
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      {verified && role === 'patient' && (
        <Button
          label={'Nearby Hospitals'}
          icon='pi pi-map-marker'
          text
          className='text-white no-outline font-bold rounded'
          onClick={() => navigate(ROUTE_PATH.PATIENT.NEARBYHOSPITAL)}
        />
      )}
      {verified && role === 'patient' && (
        <Button
          label={'Doctors'}
          icon='pi pi-calendar-clock'
          text
          className='text-white no-outline font-bold rounded'
          onClick={() => navigate(ROUTE_PATH.PATIENT.DOCTOR)}
        />
      )}
         {verified && role === 'patient' && (
        <Button
          label={'Profile'}
          icon='pi pi-user'
          text
          className='text-white no-outline font-bold rounded'
          onClick={() => navigate(ROUTE_PATH.PATIENT.DATA)}
        />
      )}
      {!verified && (
        <Button
          label={'Login'}
          icon='pi pi-user'
          text
          className='text-white no-outline font-bold rounded'
          onClick={() => navigate(ROUTE_PATH.BASE.LOGIN)}
        />
      )}
      {verified && (
        <>
          <Button
            label={'Logout'}
            icon='pi pi-power-off'
            text
            className='text-white no-outline font-bold  rounded'
            onClick={handleLogout}
          />
        </>
      )}
    </div>
  )
  return (
    <div className='border-bottom-1 border-400'>
      <div className='flex align-items-center justify-content-between p-1 block md:hidden bg-primary'>
        <h5 className='pl-2 mt-2 text-white logo'>MediConnect</h5>
        <Button
          icon='pi pi-bars'
          className='p-button-text text-white'
          onClick={() => setVisible(true)}
        />
      </div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className='p-sidebar p-sidebar-right p-sidebar-active'
        position='right'
        baseZIndex={1000}
        header={
          <div className='flex align-items-center justify-content-between p-1 block md:hidden'>
            <NavLink className='p-ripple no-underline'>
              <span className='font-bold text-black text-lg logo'>MediConnect</span>
            </NavLink>
          </div>
        }
        modal
      >
        <div className='p-sidebar-content flex flex-column justify-content-between'>
          <div className='sidebar-menu'>
            {sidebarItems.map(
              (item, index) =>
                item.visible !== false && (
                  <div
                    key={index}
                    className='sidebar-item p-3 cursor-pointer flex align-items-center'
                    onClick={
                      item.command
                        ? item.command
                        : () => handleNavigation(item.route)
                    }
                  >
                    <i
                      className={item.icon}
                      style={{ fontSize: '1.5rem', marginRight: '1rem' }}
                    ></i>
                    <span className='ml-1'>{item.label}</span>
                  </div>
                )
            )}
          </div>
          {verified && (
            <div className='p-sidebar-footer '>
              <hr className='mb-3' />
              <div className='sidebar-item mt-3'>
                <NavLink className='flex align-items-center no-underline'>
                  <Avatar
                    icon='pi pi-user'
                    image={profilePic}
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: '#ffffff',
                    }}
                    shape='circle'
                  />
                  <span className='font-bold ml-2 text-black'>{userName}</span>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </Sidebar>

      <div className='hidden md:block'>
        <Menubar
          start={start}
          end={end}
          style={{ backgroundColor: 'var(--primary-color)' }}
        />
      </div>
    </div>
  )
}

export default Header
