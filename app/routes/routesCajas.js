const express = require('express');

const router = express.Router();

const CajaDeAhorroController = require('../controllers/cajasAhorroController');
const { body, validationResult } = require('express-validator');
const {verificacion}  = require('../../app/server');
/* Rutas d cajas de Ahorro */
// ver todas las cajas
router.get('/cajas',verificacion, CajaDeAhorroController.getAllCajasDeAhorro);

// Ruta para obtener una caja de ahorro por ID
router.get('/cajas/:id', verificacion,CajaDeAhorroController.getCajaDeAhorroById);

// Ruta para crear una nueva caja de ahorro
router.post('/cajas',verificacion, [
    body('nombre').notEmpty().withMessage('El campo nombre es requerido'),
    body('municipio').notEmpty().withMessage('El campo municipio es requerido'),
    body('ubicacion').notEmpty().withMessage('El campo ubicación es requerido'),
    body('email').isEmail().withMessage('El campo email debe ser una dirección de correo válida'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
], CajaDeAhorroController.createCajaDeAhorro);

// Ruta para actualizar una caja de ahorro
router.put('/cajas/:id',verificacion,[
    body('nombre').notEmpty().withMessage('El campo nombre es requerido'),
    body('municipio').notEmpty().withMessage('El campo municipio es requerido'),
    body('ubicacion').notEmpty().withMessage('El campo ubicación es requerido'),
    body('email').isEmail().withMessage('El campo email debe ser una dirección de correo válida'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
],CajaDeAhorroController.updateCajaDeAhorro);

// Ruta para eliminar una caja de ahorro
router.delete('/cajas/:id', verificacion,CajaDeAhorroController.deleteCajaDeAhorro);

module.exports = router;