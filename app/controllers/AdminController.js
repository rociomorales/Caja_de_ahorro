const { admin } = require('../database/db');
const { validationResult } = require('express-validator');

class AdminController {
  async getAllAdmins(req, res) {
    try {
      const admins = await admin.findAll();
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error al obtener los administradores:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAdminById(req, res) {
    const { id } = req.params;
    try {
      const adminData = await admin.findByPk(id);
      if (adminData) {
        res.status(200).json(adminData);
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el administrador por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async createAdmin(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, lastname, rfc, email, phone } = req.body;

      const Admin = await admin.create({ username, lastname, rfc, email, phone });

      res.status(201).json(Admin);
    } catch (error) {
      console.error('Error al crear el administrador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


async updateAdmin(req, res) {
    const { id } = req.params;
    const updates = req.body;

    // Verificar errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    try {
      const [numRowsUpdated, updatedAdmin] = await admin.update(updates, {
        where: { id },
        returning: true,
      });

      if (numRowsUpdated === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
      } else {
        res.status(200).json({
          message: 'Información actualizada exitosamente',
          admin: updatedAdmin[0]
        });
      }
    } catch (error) {
      console.error('Error al actualizar el administrador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }



  async deleteAdmin(req, res) {
  const { id } = req.params;

  // Verificar errores de validación
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const numAdminsDeleted = await admin.destroy({ where: { id } });
    
    if (numAdminsDeleted === 0) {
      res.status(404).json({ error: 'Administrador no encontrado' });
    } else {
      // Aquí está el cambio: enviar un mensaje de éxito además del código de estado
      res.status(200).json({ message: 'Administrador eliminado exitosamente' });
    }
  } catch (error) {
    console.error('Error al eliminar el administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

}

module.exports = new AdminController();
