import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = ({ nav, sendDataToParent }) => {
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen(!open)
		sendDataToParent(nav = !open)
	}

	const closeMenu = () => {
		setOpen(false)
		sendDataToParent(false)
	}

	//TODO: Need to reset as not open when screen width > 600px
	useEffect(() => {
		const resetMenu = () => {
			// Set menu to closed if screen width > 600px
			if ({ open } && window.innerWidth > 600)
				closeMenu()
		}

		window.addEventListener('resize', resetMenu)
		return () => window.removeEventListener('scroll', resetMenu)

		/* Ignore react warrning 'missing dependancy' */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<nav className='navbar'>
			{/* Logo stored in aws s3 bucket */}
			<img className='nav-logo' draggable='false' alt=''
				src='https://dogetrader.s3.us-east-2.amazonaws.com/dash_icon.png' />

			<div onClick={handleClick} className='nav-icon'>
				{open ? <FiX /> : <FiMenu />}
			</div>

			<ul className={open ? 'nav-links active' : 'nav-links'}>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/' onClick={closeMenu}
						className={() => open ? (window.location.pathname.equals('/') ? 'nav-link selected' : 'nav-link') : 'nav-link inactive'} >
						Dashboard
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/triggers' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						Triggers
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/stats' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						Stats
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={() => localStorage.removeItem('authToken')}>
						Logout
					</Link>
				</li>

			</ul>
		</nav>
	)
}

export default Navbar