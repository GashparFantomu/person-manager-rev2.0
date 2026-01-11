const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectat la... ce dumniezo o fi aia -> ${conn.connection.host}`);
        
        // Drop the problematic index if it exists
        const db = mongoose.connection.db;
        try {
            await db.collection('people').dropIndex('id_1');
            console.log('Dropped duplicate index id_1');
        } catch (err) {
            console.log('Index id_1 not found or already dropped:', err.message);
        }
    } catch (error) {
        console.error(`Eroare an plm ${error.message}`);
    }
};

module.exports = connectDB;