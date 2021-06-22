import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

/* Components */
import CachedImage from './CachedImage'

//TODO rename, nav = isNavOpen
const Navbar = ({ isNavOpen, setNavStatus, setMaxHeight }) => {
	const [path, setPath] = useState('/dashboard')

	const toggleMenu = () => setNavStatus(!isNavOpen)

	const selectLink = (path) => {
		setPath(path)
		setNavStatus(false)
	}

	const history = useHistory()

	const resize = () => {
		const h = window.innerHeight,
			w = window.innerHeight;

		// Set menu to closed if screen width > 600px
		if (!isNaN(w) && w > 600)
			setNavStatus(false)

		// Cache resized window's max height
		if (!isNaN(h) && h > 0)
			setMaxHeight(h)
	}

	useEffect(() => {
		/* Listen to resize  */
		resize()
		window.addEventListener('resize', resize)
		return () => window.removeEventListener('resize', resize)

		/* 
			Ignore react warrning 'missing dependancy'
			Passing an empty array as we only want to run
			once due to registering a listener
		*/
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<nav className='navbar'>
			<CachedImage name='nav-logo' event={() => history.push('/dashboard')}
				url={process.env.REACT_APP_CLOUDFRONT_URL + 'dash_icon.png'} />

			<div onClick={toggleMenu} className='nav-icon'>
				{isNavOpen ? <FiX /> : <FiMenu />}
			</div>

			<ul className={isNavOpen ? 'nav-links active' : 'nav-links'}>

				<li className={isNavOpen ? 'nav-item active' : 'nav-item'}>

					<Link onClick={() => selectLink('/dashboard')}
						className={path === '/dashboard' ? 'nav-link selected' : 'nav-link'}
						to={{ pathname: '/dashboard', fromMenu: isNavOpen && window.innerWidth < 601 }} >

						Dashboard
					</Link>
				</li>

				<li className={isNavOpen ? 'nav-item active' : 'nav-item'}>

					<Link onClick={() => selectLink('/triggers')}
						className={path === '/triggers' ? 'nav-link selected' : 'nav-link'}
						to={{ pathname: '/triggers', fromMenu: isNavOpen && window.innerWidth < 601 }} >

						Triggers
					</Link>
				</li>

				<li className={isNavOpen ? 'nav-item active' : 'nav-item'}>

					<Link onClick={() => selectLink('/stats')}
						className={path === '/stats' ? 'nav-link selected' : 'nav-link'}
						to={{ pathname: '/stats', fromMenu: isNavOpen && window.innerWidth < 601 }} >

						Stats
					</Link>
				</li>

				<li className={isNavOpen ? 'nav-item active' : 'nav-item'}>
					<Link to='/login' className='nav-link' onClick={() => {
						localStorage.removeItem('authToken')
						setNavStatus(false)
					}} >

						Logout
					</Link>
				</li>

			</ul>
		</nav>
	)
}

export default Navbar