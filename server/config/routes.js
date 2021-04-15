const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get))

    app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove))

    app.route('/stats')
    .all(app.config.passport.authenticate())
    .get(app.api.stat.get)

    app.route('/programs')
    .all(app.config.passport.authenticate())
    .get(app.api.program.get)
    .post(app.api.program.save)
	
    app.route('/programs/:id')
    .all(app.config.passport.authenticate())
    .delete(admin(app.api.program.remove))
	.put(app.api.program.save)
	
	app.route('/projects')
    .all(app.config.passport.authenticate())
    .get(app.api.project.get)
    .post(app.api.project.save)
	
    app.route('/projects/:id')
    .all(app.config.passport.authenticate())
    .delete(admin(app.api.project.remove))
	.put(app.api.project.save)
	
	app.route('/reservations')
    .all(app.config.passport.authenticate())
    .get(app.api.reservation.get)
    .post(app.api.reservation.save)
	
    app.route('/reservations/:id')
    .all(app.config.passport.authenticate())
    .delete(admin(app.api.reservation.remove))
	.put(admin(app.api.reservation.save))

}