const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const routes = require('./src/routes/routes')
const config = require('./src/config/config')

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(express.json())
app.use('/db/system', routes)

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword,
	{
		host: config.host,
		dialect: config.dialect
	}
)

app.use((req, res) => {
	res.status(404).send('Page not found')
})

app.use((req, res) => {
	res.status(500).json(error)
})

sequelize.sync().then(() => {
	const port = 3003
	app.set('port', port)
	app.listen(port)
})
