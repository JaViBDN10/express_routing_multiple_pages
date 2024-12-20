const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json()); // Para parsear el body de la request como JSON
app.use(cors(
	{
		origin:'*'
	}
));

// Use route files
const usersRoutes = require('./users/users');
app.use('/users', usersRoutes);

const loginRoutes = require('./login/login');
app.use('/login', loginRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
