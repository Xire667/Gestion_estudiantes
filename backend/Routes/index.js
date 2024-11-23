const {Route, Router} = require('express')

const {CarreraRouter} = require('../Routes/CarreraRoutes')
const {CursoRouter} = require('../Routes/CursoRoutes')
const {RolRouter} = require('../Routes/RolesRoutes')
const {UserRouter} = require('../Routes/UserRoutes')
const {StudentRouter} = require('../Routes/StudentRoutes')

const router = Router()

router.use('/carrera', CarreraRouter)
router.use('/curso', CursoRouter)
router.use('/rol', RolRouter)
router.use('/student', StudentRouter)
router.use('/user', UserRouter)

module.exports = router