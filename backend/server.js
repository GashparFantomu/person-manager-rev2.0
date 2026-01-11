const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const connectDB = require('./src/config/db.js');

const personRoutes = require('./src/routes/personRoutes.js');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/persons', personRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'daca vezi asta, merge! daca nu, mori' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT} <- da! fix asta`);
});