const express = require('express');
const verifyToken = require('../auth/auth');
const { consultaTabla, updateTable, alterTable } = require('../services/services');
const router = express.Router();

router.post('', verifyToken, async (req, res) => {
    const { user, pass } = req.body;
    try {
        await updateTable(user, pass, 0);
        const users = await consultaTabla();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir usuario' });
    }
});
router.get('', verifyToken, async (req, res) => {
	try {
		const users = await consultaTabla();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

router.delete('', verifyToken, async (req, res) => {
    const { user, pass } = req.body;
    try {
        await updateTable(user, pass, 1);
        const users = await consultaTabla();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar usuario' });
    }
});

router.put('', verifyToken, async (req, res) => {
    const { user, pass, newUser, newPass } = req.body;
    try {
        await alterTable(user, pass, newUser, newPass);
        const users = await consultaTabla();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar usuario' });
    }
});
module.exports = router;
