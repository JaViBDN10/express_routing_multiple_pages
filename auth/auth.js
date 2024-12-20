const jwt = require('jsonwebtoken');

// Configuraciones de seguridad y base de datos
const SECRET_KEY = 'supersecreto1234'; 

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });
	const token = authHeader.split(' ')[1]; // Separa el Bearer del token
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded; // Información decodificada del token
		next(); // Continuar con la solicitud
	} catch (err) {
		return res.status(401).json({ error: 'Token no válido' });
	}

}

module.exports = verifyToken;