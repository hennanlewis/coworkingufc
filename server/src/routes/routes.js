const express = require('express')
const router = express.Router()
const ManagersController = require('../controllers/ManagersController')
const UsersController = require('../controllers/UsersController')
const ProgramsController = require('../controllers/ProgramsController')

router.post('/managers', ManagersController.Insert)
router.get('/managers', ManagersController.SearchAll)
router.get('/managers/:id', ManagersController.SearchOne)
router.put('/managers/:id', ManagersController.Update)
router.delete('/managers/:id', ManagersController.Delete)

router.post('/users', UsersController.Insert)
router.get('/users', UsersController.SearchAll)
router.get('/users/:id', UsersController.SearchOne)
router.put('/users/:id', UsersController.Update)
router.delete('/users/:id', UsersController.Delete)

router.post('/programs', ProgramsController.Insert)
router.get('/programs', ProgramsController.SearchAll)
router.get('/programs/:id', ProgramsController.SearchOne)
router.put('/programs/:id', ProgramsController.Update)
router.delete('/programs/:id', ProgramsController.Delete)


module.exports = router