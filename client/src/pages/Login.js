import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'



export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const { loginUser } = useContext(AuthContext)

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }

		axios.post('/auth/login', requestBody)
			.then(response => {

				console.log('i have a token mothafuckas', response.data.authToken)
				const token = response.data.authToken
				loginUser(token)
				navigate('/pokecards')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<div>
			<h1>Login</h1>
			<div className='loginsignup-form'>
			<form className='sign-log-form' onSubmit={handleSubmit}>
			<div className='title'>Welcome</div>
			<div className="subtitle">Log in to continue to Website!</div>
			<div className="input-container ic1">
				<input id="email" className="input" placeholder="Enter Your Email " type="text" name="email" value={email} onChange={handleEmail} />
				<div className="cut"></div>
			    <div className='input-container ic2'>
				<input id='password' className='input' placeholder="Enter Your Password" type="password" value={password} onChange={handlePassword} />

				<button className='submit' type="submit">Log In</button>
				{errorMessage && <p className='signup-message'>{errorMessage}</p>}

			         <p className='signup-message'>Don´t have an account?</p>
			         <Link className='link-signuptologin' to='/signup'>Signup</Link>
				</div>
				
				</div>
			</form>
			</div>

		
		
		</div>
	)
}



