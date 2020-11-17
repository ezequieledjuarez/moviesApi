const express = require('express')
const router = express.Router()

const moviesValidator = require('../validations/moviesValidator')
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.all)
router.get('/detail/:id', moviesController.detail)
router.post('/create',moviesController.create)
router.put('/edit/:id', moviesController.edit)
router.delete('/delete/:id', moviesController.delete)

router.post('/search', moviesController.search)

module.exports = router