const {Route, Router} = require('express')

const {CarreraRouter} = require('../Routes/CarreraRoutes')
const {CursoRouter} = require('../Routes/CursoRoutes')
const {RolRouter} = require('../Routes/RolesRoutes')
const {UserRouter} = require('../Routes/UserRoutes')
const {StudentRouter} = require('../Routes/StudentRoutes')
const {MatriculaRouter} = require('../Routes/MatriculaRoutes')
const {NotaRouter} = require('../Routes/NotasRoutes')

const router = Router()

router.use('/carrera', CarreraRouter)
router.use('/curso', CursoRouter)
router.use('/rol', RolRouter)
router.use('/student', StudentRouter)
router.use('/user', UserRouter)
router.use('/matricula', MatriculaRouter)
router.use('/nota', NotaRouter)

module.exports = router