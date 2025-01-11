import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <>
        <header className='header'>
            <div className='header_logo_container'>
                <img className='header_logo' src='/assets/FF_Icon.png' alt='Logo'/>
                <p className='header_Title' >Admin Console</p>
                <p className='header_adminView' >ADMIN VIEW</p>
            </div>
            <div className='header_support_user'>
                <div className='header_support'>
                    <img className='header_support_image' src='/assets/Support.png' alt='support' />
                    <p className='header_support_text'>Support</p>
                </div>
                <div className='header_user'>
                    <img className='header_user_image' src='/assets/user_image.png' alt='user'/>
                    <p className='header_user_name' >Priyavart</p>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header;
