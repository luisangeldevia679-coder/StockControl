const express = require('express');
const cors = require('cors'); // ¡Para conectar con el frontend!

// 1. Importar tus rutas
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 2. Middlewares globales
app.use(cors()); // Permite peticiones de otros puertos
app.use(express.json()); // Permite leer los datos enviados en formato JSON

// 3. Unir las Rutas
// Le decimos a Express que cualquier petición que empiece con '/api/categories' 
// debe ser manejada por las rutas que importamos.
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// 4. Exportar o inicializar la app
module.exports = app; 
// (Luego en otro archivo como server.js, o al final de este, haces app.listen(3000))
