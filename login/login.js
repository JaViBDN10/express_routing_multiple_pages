const express = require('express');
const { consultaLogin } = require('../services/services');
const router = express.Router();
const jwt = require('jsonwebtoken'); 

const SECRET_KEY = 'supersecreto1234'; 
const TOKEN_EXPIRATION = '1h';

router.post('', async (req, res) => {
	const { user, pass } = req.body;
	const isValidLogin = await consultaLogin(user, pass);
	if (isValidLogin) {
		const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
		res.status(200).json({ token });
	} else {
		res.status(401).json({ error: 'Credenciales incorrectas' });
	}
});

module.exports = router;