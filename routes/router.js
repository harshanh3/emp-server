const express = require('express')
const userController = require('../controllers/userController')
const empcontroller = require('../controllers/empController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// add
router.post('/add-emp',jwtMiddleware,multerMiddleware.single('empImg'),empcontroller.addEmpController)
// dash
router.get('/dash',jwtMiddleware,empcontroller.dashboardetailsController)
//delete 
router.delete('/emp/:id/remove',jwtMiddleware,empcontroller.removeempController)
// edit
router.put('/emp/:id/edit',jwtMiddleware,multerMiddleware.single('empImg'),empcontroller.editEmpController)



module.exports = router

