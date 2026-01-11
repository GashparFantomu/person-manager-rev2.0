const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectat la... ce dumniezo o fi aia -> ${conn.connection.host}`);
    } catch (error) {
        console.error(`Eroare an plm ${error.message}`);
    }
};

module.exports = connectDB;