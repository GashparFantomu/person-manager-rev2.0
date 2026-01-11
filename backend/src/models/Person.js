const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    nume: {
        type: String,
        required: true
    },
    cnp: {
        type: String,
        required: true,
        unique: true
    },
    adresa: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true
    },
    nrBuletin: {
        type: String,
        required: true
    },
    poza: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);