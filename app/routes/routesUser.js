
const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {verificacion}  = require('../../app/server');

router.get('/users', verificacion,UserController.getUsers);
router.post('/users', verificacion,[
    body('correo').isEmail().withMessage('Correo inválido'),
    body('nombre').notEmpty().withMessage('Nombre es requerido'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
    
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ], UserController.createUser);

router.put('/users/:id',verificacion, [
  body('correo').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('nombre').notEmpty().withMessage('El nombre es requerido').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('phone').isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener exactamente 10 dígitos'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
],UserController.editUser);
router.delete('/users/:id',verificacion, UserController.deleteUser);

module.exports = router;

