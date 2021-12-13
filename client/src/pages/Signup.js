import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }

		axios.post('/auth/signup', requestBody)
			.then(response => {
				navigate('/login')
			})
			.catch(error => {
				const errorDescrition = error.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<div>
			<h1>Signup</h1>
			<div className='loginsignup-form'>
			<form className='sign-log-form' onSubmit={handleSubmit}>
				<div className='title'>Welcome</div>
				<div className="subtitle">Let's create your account!</div>
				<div className="input-container ic1">
				<input id="email" className="input" placeholder="Enter Your Email " type="text" name="email" value={email} onChange={handleEmail} />
				<div className="cut"></div>
			    <div className='input-container ic2'>
				<input id='password' className='input' placeholder="Enter Your Password" type="password" value={password} onChange={handlePassword} />
				<div className="cut"></div>
				<div className="input-container ic2">
				<input id='name' className='input' type="text" placeholder="Enter Your Name" value={name} onChange={handleName} />
				
				<button className='submit' type="submit">Sign Up</button>
				{errorMessage && <p className='signup-message'>{errorMessage}</p>}

			<p className='signup-message'>Already have an account?</p>
			<Link className='link-signuptologin' to='/login'>Login</Link>
				</div>
			  </div>
            </div>
			</form>
			</div>

			
		</div>
	)
}