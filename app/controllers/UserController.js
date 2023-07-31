
// controllers/userController.js
const { User } = require('../database/db');
const { validationResult } = require('express-validator');

class UserController {


  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    }
  }
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { correo, nombre, phone, password } = req.body;
      const user = await User.create({ correo, nombre, phone, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    }
  }
  
  async editUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { correo, nombre, phone, password } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      user.correo = correo;
      user.nombre = nombre;
      user.phone = phone;
      user.password = password;

      await user.save();

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    }
  }

  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await user.destroy();

      res.json({ message: 'Usuario eliminado exitosamante' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    }
  }

}

module.exports = new UserController();
