// // controllers/superAdminController.js
// const { SuperAdmin } = require('../database/db');
// const { validationResult } = require('express-validator');

// class SuperAdminController {
  
//   async getSuperAdmins(req, res) {
//     try {
//       const superAdmins = await SuperAdmin.findAll();
//       res.json(superAdmins);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }

//   async createSuperAdmin(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { usuario, password } = req.body;
//       const superAdmin = await SuperAdmin.create({ usuario, password });
//       res.status(201).json(superAdmin);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
  
//   async editSuperAdmin(req, res) {
//     try {
//       const { id } = req.params;
//       const { usuario, password } = req.body;

//       const superAdmin = await SuperAdmin.findByPk(id);
//       if (!superAdmin) {
//         return res.status(404).json({ message: 'SuperAdmin not found' });
//       }

//       superAdmin.usuario = usuario;
//       superAdmin.password = password;

//       await superAdmin.save();

//       res.json(superAdmin);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }

//   async deleteSuperAdmin(req, res) {
//     try {
//       const { id } = req.params;

//       const superAdmin = await SuperAdmin.findByPk(id);
//       if (!superAdmin) {
//         return res.status(404).json({ message: 'SuperAdmin not found' });
//       }

//       await superAdmin.destroy();

//       res.json({ message: 'SuperAdmin deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }

// module.exports = new SuperAdminController();
