const express = require('express');
const router = express.Router();
const { getPersons, createPerson } = require('../controllers/personController');

router.get('/', getPersons);
router.post('/', createPerson);

module.exports = router;