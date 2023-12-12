const express = require('express')
const { handleUserSign, handleUserLogin } = require('../controller/users')
const router = express.Router()


router.post('/',handleUserSign)
router.post('/login',handleUserLogin)

module.exports = router