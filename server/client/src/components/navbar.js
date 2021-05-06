import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

/* Components */
import CachedImage from './CachedImage'

//TODO rename, nav = isOpen
const Navbar = ({ isOpen, syncStatus }) => {
	const [path, setPath] = useState('/dashboard')

	const toggleMenu = () => {
		syncStatus(!isOpen)
	}

	const selectLink = (path) => {
		setPath(path)
	}

	useEffect(() => {
		const resetMenu = () => {
			// Set menu to closed if screen width > 600px
			if ({ isOpen } && window.innerWidth > 600) {
				syncStatus(false)
			}
		}

		//TODO fix a nicer solution
		/* Listen to resize to reset menu  */
		window.addEventListener('resize', resetMenu)
		return () => window.removeEventListener('resize', resetMenu)

		/* Ignore react warrning 'missing dependancy' */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, syncStatus])

	return (
		<nav className='navbar'>
			<CachedImage name='nav-logo' url={process.env.REACT_APP_CLOUDFRONT_URL + 'dash_icon.png'} />

			<div onClick={toggleMenu} className='nav-icon'>
				{isOpen ? <FiX /> : <FiMenu />}
			</div>

			<ul className={isOpen ? 'nav-links active' : 'nav-links'}>

				<li className={isOpen ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/dashboard', isOpen }}
						onClick={() => selectLink('/dashboard')}
						className={path === '/dashboard' ? 'nav-link selected' : 'nav-link'} >

						Dashboard
					</Link>
				</li>

				<li className={isOpen ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/triggers', isOpen }}
						onClick={() => selectLink('/triggers')}
						className={path === '/triggers' ? 'nav-link selected' : 'nav-link'} >

						Triggers
					</Link>
				</li>

				<li className={isOpen ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/stats', isOpen }}
						onClick={() => selectLink('/stats')}
						className={path === '/stats' ? 'nav-link selected' : 'nav-link'} >

						Stats
					</Link>
				</li>

				<li className={isOpen ? 'nav-item active' : 'nav-item'}>
					<Link to='/login' className='nav-link' onClick={() => localStorage.removeItem('authToken')} >

						Logout
					</Link>
				</li>

			</ul>
		</nav>
	)
}

export default Navbar