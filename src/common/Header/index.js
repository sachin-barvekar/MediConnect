import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../constant/urlConstant'
import { Sidebar } from 'primereact/sidebar'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/action/auth/login'
import { init_verification } from '../../redux/action/auth/smg91'
import { toast } from 'react-toastify'

const Header = ({ role, verified }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.firstname +" "+ user?.lastname??""
  const handleNavigation = route => {
    navigate(route)
    setVisible(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(init_verification())
    navigate(ROUTE_PATH.BASE.HOME)
    toast.success('Logout Successfully')
  }
  const sidebarItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home', route: ROUTE_PATH.BASE.HOME },
    {
      label: 'About Us',
      icon: 'pi pi-fw pi-info-circle',
      route: ROUTE_PATH.BASE.HOME,
    }, 
    !verified && {
      label: 'Login',
      icon: 'pi pi-fw pi-user',
      route: ROUTE_PATH.BASE.LOGIN,
      visible: !verified,
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      route: ROUTE_PATH.BASE.HOME,
    },
    verified && {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off p-error',
      command: handleLogout,
    },
  ].filter(Boolean)

  const start = (
    <div className='m-2'>
     <h3 className='text-white'>MediConnect</h3>
    </div>
  )

  const end = (
    <div className='flex gap-2'>
      <Button
        label={'Home'}
        icon='pi pi-home'
        text
        className='text-white no-outline font-bold  rounded'
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      <Button
        label={'About Us'}
        icon='pi pi-info-circle'
        text
        className='text-white no-outline font-bold rounded'
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
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
      <div className='flex align-items-center justify-content-between p-1 block md:hidden' style={{backgroundColor:"#D49BA2"}}>
     <h3 className='pl-2 text-white'>MediConnect</h3>
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
              <span className='font-bold'>MediConnect</span>
            </NavLink>
          </div>
        }
        modal>
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
                    }>
                    <i
                      className={item.icon}
                      style={{ fontSize: '1.5rem', marginRight: '1rem' }}></i>
                    <span className='ml-1'>{item.label}</span>
                  </div>
                ),
            )}
          </div>

          <div className='p-sidebar-footer '>
            <hr className='mb-3' />
            <div className='sidebar-item mt-3'>
              <NavLink className='flex align-items-center no-underline'>
                <Avatar
                  icon='pi pi-user'
                  style={{ backgroundColor: '#28a745', color: '#ffffff' }}
                  shape='circle'
                />
                <span className='font-bold'>{userName}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </Sidebar>

      <div className='hidden md:block'>
        <Menubar start={start} end={end} style={{backgroundColor:"#D49BA2"}} />
      </div>
    </div>
  )
}

export default Header
