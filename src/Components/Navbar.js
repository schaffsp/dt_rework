import React from 'react'
import '../CSS/Navbar.css'
import { Link } from 'react-router-dom';

/**
 * Formats a navbar that sits on top of the rest of the app.
 * @returns a formatted NavBar
 */
const Navbar = () => {
    return (
        <div className='Navbar-Container'>
            <h1 className='Navbar-Component'>Logo Here</h1>
            <div className='Navbar-Link-Container'>
                <Link className='Navbar-Link' to="/">Home</Link>
                <Link className='Navbar-Link' to="/about">About</Link>
            </div>
        </div>
    )
}

export default Navbar
