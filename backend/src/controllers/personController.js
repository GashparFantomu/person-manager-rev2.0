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
    const { id, nume, cnp, adresa, varsta, serie, nrBuletin, poza } = req.body;

    try {
        const person = await Person.create({ id, nume, cnp, adresa, varsta, serie, nrBuletin, poza });
        res.status(201).json(person); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPersons,
    createPerson
};