const express = require('express')
const sequelize = require('./src/database/database')
const http = require('http')
const status = require('http-status')
const app = express()
const routes = require('./src/routes/routes')

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
});

app.use(express.json())
app.use('/db/system', routes)

app.use((req, res, next) => {
	res.status.apply(status.NOT_FOUND).send('Page not found')
})

app.use((req, res, next) => {
	res.status.apply(status.INTERNAL_SERVER_ERROR).json({error})
})

sequelize.sync({ force: false }).then(() => {
	const port = 3003
	app.set('port', port)
	const server = http.createServer(app)
	server.listen(port)
})
