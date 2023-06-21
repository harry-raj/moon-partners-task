const express = require('express');
const { searchAndFilterItems } = require('../controllers/index');

const router = express.Router();
router.get('/all-items', searchAndFilterItems);

module.exports = router;