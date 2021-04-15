const axios = require('axios')

const token = () => localStorage.getItem('CWdata') ? (JSON.parse(localStorage.getItem('CWdata'))).token : ''

export const BDreq = axios.create({ 
	baseURL: 'http://localhost:5000',
	headers: { 'Authorization': `bearer  ${token}`}
})

export default BDreq