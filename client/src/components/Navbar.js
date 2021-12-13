import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function Navbar() {

	const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

	// console.log('user', user)

	return (
		<nav >
            <div className='nav-center'>
                <div className='nav-header'>

                
			<Link to='/'>
				<button>Home</button>
			</Link>
			{isLoggedIn ?
				(
					<>
						<Link to='/pokecards'>
							<button>PokeCards</button>
						</Link>
						<Link to='/'>
						<button onClick={logoutUser}>Logout</button>
						</Link>
					</>
				) : (
					<>
						<Link to='/signup'>
							<button>Signup</button>
						</Link>
						<Link to='/login'>
							<button>Login</button>
						</Link>
					</>
				)}
                </div>
            </div>
		</nav>
	)
}