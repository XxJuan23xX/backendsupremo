const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const { poolPromise } = require('./db');

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

// Endpoint raíz
app.get('/', (req, res) => {
    res.send('Hello, this is the backend!');
});

// Rutas
app.use('/api/users', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);

// Endpoint de prueba de conexión a la base de datos
app.get('/api/test-db', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT COUNT(*) as count FROM Usuarios');
        res.json({ count: result.recordset[0].count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
