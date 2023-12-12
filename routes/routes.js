const express = require('express');
const { urlHandler, analyticsHandler } = require('../controller/url');

const router = express.Router();



// Route-1 : Generate an entry to database
router.post('/',urlHandler)

// Route-3: Get the analytics
router.get('/analytics/:id',analyticsHandler)



module.exports = router