const fields = {
	id: '',
	name: '',
	email: '',
	token: ''
}

const localData = () => {
	let data = fields
	let CWdata = localStorage.getItem('CWdata')
	if(CWdata) {
		data.id = CWdata.id
		data.name = CWdata.name
		data.email = CWdata.email
		data.token = CWdata.token
	} 

	return data
} 

export default localData