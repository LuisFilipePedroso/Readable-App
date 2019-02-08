import React from 'react'
import Logo from '../images/Logo.svg'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav-content">
                <div>
                    <Link to={'/'} className="text-decoration-none">
                        <img alt="Readable Project Logo" src={Logo} className="nav-logo" />
                    </Link>
                </div>
                <div className="nav-title">
                    <h2>My Posts</h2>
                </div>
            </div>
        </div>
    )
}

export default Nav