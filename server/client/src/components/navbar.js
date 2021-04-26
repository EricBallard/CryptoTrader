import React, { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
	const [open, setOpen] = useState(false)
	
	const handleClick = () => setOpen(!open)
	const closeMenu = () => setOpen(false)

	return (
		<nav className='navbar'>
			<Link to='/' className='nav-logo'>
				DogeTrader
			</Link>
			<div onClick={handleClick} className='nav-icon'>
				{open ? <FiX /> : <FiMenu />}
			</div>
			<ul className={open ? 'nav-links active' : 'nav-links'}>
				<li className='nav-item'>
					<Link to='/' className='nav-link' onClick={closeMenu}>
						Dashboard
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/about' className='nav-link' onClick={closeMenu}>
						Triggers
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/shop' className='nav-link' onClick={closeMenu}>
						Stats
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/contact' className='nav-link' onClick={closeMenu}>
						About
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar