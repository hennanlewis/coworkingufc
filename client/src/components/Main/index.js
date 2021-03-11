import React from 'react'
import './index.css'

export default function Main() {

	const chama = () => {
		const axios = require('axios');

		// Make a request for a user with a given ID
		axios.get('http://localhost:3003/db/system/managers/')
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			})

	}

	return (
		<main className="main">
			<button onClick={chama}>Chama no bug</button>
		</main>
	)

}