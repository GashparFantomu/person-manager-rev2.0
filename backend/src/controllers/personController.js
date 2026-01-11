const Person = require('../models/Person'); 


const getPersons = async (req, res) => {
    try {
        const persons = await Person.find().sort({ createdAt: -1 });
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPerson = async (req, res) => {

    try {
        const person = await Person.create(req.body);
        res.status(201).json(person); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPersons,
    createPerson
};