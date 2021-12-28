import React from 'react'
import '../CSS/Navbar.css'

const Navbar = () => {
    return (
        <div className='Navbar-Container'>
            <h1 className='Navbar-Component'>Drivethrough Rework</h1>
            <button className='Navbar-Component Navbar-Button'>How does it work?</button>
            <button className='Navbar-Component Navbar-Button'>About</button>
        </div>
    )
}

export default Navbar
