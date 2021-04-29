import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

//TODO rename, nav = isOpen
const Navbar = (props) => {
	const [open, setOpen] = useState(props.isOpen)
	const [path, setPath] = useState('/')

	const toggleMenu = () => {
		props.syncStatus(!open)
		setOpen(!open)
	}

	const selectLink = (path) => {
		setPath(path)
	}

	useEffect(() => {
		const resetMenu = () => {
			// Set menu to closed if screen width > 600px
			if ({ open } && window.innerWidth > 600) {
				setOpen(false)
				props.syncStatus(false)
			}
		}


		//TODO fix a nicer solution

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
				src={process.env.REACT_APP_CLOUDFRONT_URL + 'dash_icon.png'} />

			<div onClick={toggleMenu} className='nav-icon'>
				{open ? <FiX /> : <FiMenu />}
			</div>

			<ul className={open ? 'nav-links active' : 'nav-links'}>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/', open }}
						onClick={() => selectLink('/')}
						className={path === '/' ? 'nav-link selected' : 'nav-link'}
						>

						Dashboard
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/triggers', open }}
						onClick={() => selectLink('/triggers')}
						className={path === '/triggers' ? 'nav-link selected' : 'nav-link'} >

						Triggers
					</Link>
				</li>

				<li className={open ? 'nav-item active' : 'nav-item'}>
					<Link to={{ pathname: '/stats', open }}
						onClick={() => selectLink('/stats')}
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