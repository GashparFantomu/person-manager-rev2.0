const express = require('express');
const router = express.Router();
const { getPersons, createPerson, deletePerson, updatePerson  } = require('../controllers/personController');

router.get('/', getPersons);
router.post('/', createPerson);
router.delete('/:id', deletePerson);
router.put('/:id', updatePerson);

module.exports = router;