// // routes/superAdminRoutes.js
// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const superAdminController = require('../controllers/superAdminController');
// const {verificacion}  = require('../../app/server');

// router.get('/superadmins',verificacion, superAdminController.getSuperAdmins);

// router.post('/superadmins', verificacion,[
//   body('usuario').isLength({ min: 5 }).withMessage('El usuario debe tener al menos 5 caracteres'),
//   body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
// ], superAdminController.createSuperAdmin);

// router.put('/superadmins/:id', verificacion,[
//   body('usuario').optional().isLength({ min: 5 }).withMessage('El usuario debe tener al menos 5 caracteres'),
//   body('password').optional().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
// ], superAdminController.editSuperAdmin);

// router.delete('/superadmins/:id',verificacion, superAdminController.deleteSuperAdmin);

// module.exports = router;
