import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = ({ nav, sendDataToParent}) => {
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen(!open)
		sendDataToParent(nav = !open)
	}

	const closeMenu = () =>{
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

			<Link to='/' className='nav-logo'>
				DogeTrader
			</Link>

			<div onClick={handleClick} className='nav-icon'>
				{open ? <FiX /> : <FiMenu />}
			</div>

			<ul className={open ? 'nav-links active' : 'nav-links'}>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						Dashboard
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/about' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						Triggers
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/shop' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						Stats
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/contact' className={open ? 'nav-link' : 'nav-link inactive'}
						onClick={closeMenu}>
						About
					</Link>
				</li>

			</ul>
		</nav>
	)
}

export default Navbar