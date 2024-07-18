const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./userRoutes');

const app = express();

// Configuración de CORS
const allowedOrigins = ['https://storepet.vercel.app'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Middleware para asegurarse de que las solicitudes OPTIONS reciban las cabeceras adecuadas
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Endpoint raíz
app.get('/', (req, res) => {
    res.send('Hello, this is the backend!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
