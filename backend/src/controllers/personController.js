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

const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Persoana nu a fost găsita, he erased his trace (and his search history)' });
        }
        res.status(200).json({ message: 'Persoana a fost stearsa cu succes yay' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Persoana nu a fost gasita pentru actualizare' });
        }
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPersons,
    createPerson,
    deletePerson,
    updatePerson
};