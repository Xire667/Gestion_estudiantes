const {Route, Router} = require('express')

const {CarreraRouter} = require('../Routes/CarreraRoutes')
const {CursoRouter} = require('../Routes/CursoRoutes')
const {RolRouter} = require('../Routes/RolesRoutes')

const router = Router()

router.use('/carrera', CarreraRouter)
router.use('/curso', CursoRouter)
router.use('/rol', RolRouter)

module.exports = router