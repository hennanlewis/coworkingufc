
export function isAuthenticated() {
	let CWdata = JSON.parse(localStorage.getItem('CWdata'))
	return (!CWdata || !CWdata.token) ? false : true
}

export function isAdmin() {
	let CWdata = JSON.parse(localStorage.getItem('CWdata'))
	return (isAuthenticated() && CWdata.admin) ? true : false
}