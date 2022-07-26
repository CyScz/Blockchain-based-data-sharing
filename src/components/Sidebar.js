import '../styles/Sidebar.css';
import logo from '../assets/logo.png'
import dashboard from '../assets/dashboard.png'
import dashboard2 from '../assets/dashboard2.png'
import data from '../assets/data.png'
import settings from '../assets/settings.png'
import home from '../assets/home.png'
import blog from '../assets/blog.png'
import contact from '../assets/contactus.png'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom';

function Sidebar() {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1068px)'
      })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1067px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    return(
            <div>
                {isDesktopOrLaptop && <div className='sidebar-layout'>
                    <nav className='main-nav'>
                        <ul className='unstyled list-hover-slide'>
                            <img className='sidebar-logo' src={logo} />
                            
                            <NavLink to='/dashboard'><li><img className='sidebar-icon' src={dashboard2} /><span className='sidebar-text'>Dashboard</span></li></NavLink>
                            <NavLink to='/datas'><li><img className='sidebar-icon' src={data} /><span className='sidebar-text'>Input / Output</span></li></NavLink>
                            <NavLink to='/settings'><li><img className='sidebar-icon' src={settings} /><span className='sidebar-text'>Settings</span></li></NavLink>
                            <NavLink to='/blog'><li><img className='sidebar-icon' src={blog} /><span className='sidebar-text'>Blog</span></li></NavLink>
                            <NavLink to='/contactus'><li><img className='sidebar-icon' src={contact} /><span className='sidebar-text'>Contact us</span></li></NavLink>
                            <NavLink to='/homepage'><li><img className='sidebar-icon' src={home} /><span className='sidebar-text'>Home</span></li></NavLink>
                        </ul>
                    </nav>
                </div>}

                {isTabletOrMobile && <div className='sidebar-layout'>
                    <nav className='main-nav-mobile'>
                        <ul className='unstyled list-hover-slide'>
                            <img className='sidebar-logo-mobile' src={logo} />
                            <NavLink to='/dashboard'><li><img className='sidebar-icon-mobile' src={dashboard2} /></li></NavLink>
                            <NavLink to='/datas'><li><img className='sidebar-icon-mobile' src={data} /></li></NavLink>
                            <NavLink to='/settings'><li><img className='sidebar-icon-mobile' src={settings} /></li></NavLink>
                            <NavLink to='/blog'><li><img className='sidebar-icon-mobile' src={blog} /></li></NavLink>
                            <NavLink to='/contactus'><li><img className='sidebar-icon-mobile' src={contact} /></li></NavLink>
                            <NavLink to='/homepage'><li><img className='sidebar-icon-mobile' src={home} /></li></NavLink>
                        </ul>
                    </nav>
                </div>}
            
            </div>
    )
}

export default Sidebar