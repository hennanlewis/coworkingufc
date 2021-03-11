const express = require('express')
const router = express.Router()
const ManagersController = require('../controllers/ManagersController')

router.post('/managers', ManagersController.Insert)
router.get('/managers', ManagersController.SearchAll)
router.get('/managers/:id', ManagersController.SearchOne)
router.put('/managers/:id', ManagersController.Update)
router.delete('/managers/:id', ManagersController.Delete)

module.exports = router