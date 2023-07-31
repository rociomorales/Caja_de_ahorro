const express = require('express');
const router = express.Router();
//controladores
const AdminController = require('../controllers/AdminController');
const { body, validationResult } = require('express-validator');
const {verificacion}  = require('../../app/server');


//Home
// router.get('/', (req, res) => res.json({ foo: "bar" }));


/* Rutas d Admin */
// observar admins
router.get('/admins',verificacion, AdminController.getAllAdmins);
// observar por ID
router.get('/admins/:id',verificacion, AdminController.getAdminById);
// prara crear un nuevo admin
router.post('/admins',verificacion, [
    body('username').notEmpty().withMessage('Nombre de usuario es requerido'),
    body('lastname').notEmpty().withMessage('Apellido es requerido'),
    body('rfc').notEmpty().withMessage('RFC es requerido'),
    body('email').notEmpty().withMessage('Correo electrónico es requerido').isEmail().withMessage('Correo electrónico inválido'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
], AdminController.createAdmin);
//  actualizar un admin
router.put('/admins/:id',verificacion,[
    body('username').optional().notEmpty().withMessage('Nombre de usuario es requerido'),
    body('lastname').optional().notEmpty().withMessage('Apellido es requerido'),
    body('rfc').optional().notEmpty().withMessage('RFC es requerido'),
    body('email').optional().notEmpty().withMessage('Correo electrónico es requerido').isEmail().withMessage('Correo electrónico inválido'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
], AdminController.updateAdmin);
// eliminar un admin
router.delete('/admins/:id', verificacion ,AdminController.deleteAdmin);



module.exports = router;