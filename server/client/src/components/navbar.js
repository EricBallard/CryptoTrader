import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

//TODO rename, nav = isOpen
const Navbar = ({ sendDataToParent }) => {
	const [open, setOpen] = useState(false)
	const [path, setPath] = useState('/')

	const toggleMenu = () => {
		sendDataToParent(!open)
		setOpen(!open)
	}

	const selectLink = (path) => {
		sendDataToParent(false)
		setOpen(false)
		setPath(path)
	}

	useEffect(() => {
		const resetMenu = () => {
			// Set menu to closed if screen width > 600px
			if ({ open } && window.innerWidth > 600) {
				setOpen(false)
				sendDataToParent(false)
			}
		}

		/* Initiaze path state to our current directory */
		setPath(window.location.pathname)

		/* Listen to resize to reset menu  */
		window.addEventListener('resize', resetMenu)
		return () => window.removeEventListener('resize', resetMenu)

		/* Ignore react warrning 'missing dependancy' */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<nav className='navbar'>
			{/* Logo stored in aws s3 bucket */}
			<img className='nav-logo' draggable='false' alt='' rel='prefetch'
				src='https://dogetrader.s3.us-east-2.amazonaws.com/dash_icon.png' />

			<div onClick={toggleMenu} className='nav-icon'>
				{open ? <FiX /> : <FiMenu />}
			</div>

			<ul className={open ? 'nav-links active' : 'nav-links'}>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/' onClick={() => selectLink('/')}
						className={path === '/' ? 'nav-link selected' : 'nav-link'} >

						Dashboard
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/triggers' onClick={() => selectLink('/triggers')}
						className={path === '/triggers' ? 'nav-link selected' : 'nav-link'} >

						Triggers
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/stats' onClick={() => selectLink('/stats')}
						className={path === '/stats' ? 'nav-link selected' : 'nav-link'} >

						Stats
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to='/' className='nav-link' onClick={() => localStorage.removeItem('authToken')}>

						Logout
					</Link>
				</li>

			</ul>
		</nav>
	)
}

export default Navbar