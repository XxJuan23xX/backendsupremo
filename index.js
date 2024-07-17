const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Configuración de CORS
const allowedOrigins = ['https://storepet.vercel.app']; // Reemplaza con tu dominio frontend
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
