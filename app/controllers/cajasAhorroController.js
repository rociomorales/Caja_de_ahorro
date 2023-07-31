const { cajadeahorro } = require('../database/db');
const { validationResult } = require('express-validator');

class CajaDeAhorroController {
  async getAllCajasDeAhorro(req, res) {
    try {
      const cajasDeAhorro = await cajadeahorro.findAll();
      res.status(200).json(cajasDeAhorro);
    } catch (error) {
      console.error('Error al obtener las cajas de ahorro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getCajaDeAhorroById(req, res) {
    const { id } = req.params;
    try {
      const cajaDeAhorroData = await cajadeahorro.findByPk(id);
      if (cajaDeAhorroData) {
        res.status(200).json(cajaDeAhorroData);
      } else {
        res.status(404).json({ error: 'Caja de ahorro no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la caja de ahorro por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async createCajaDeAhorro(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { nombre, municipio, ubicacion, email, telefono } = req.body;
      
      const newCajaDeAhorro = await cajadeahorro.create({ nombre, municipio, ubicacion, email, telefono });
      
      res.status(201).json(newCajaDeAhorro);
      // res.json({ message: 'Campos validados correctamente' });
    } catch (error) {
      console.error('Error al crear la caja de ahorro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
    
    
  }

  async updateCajaDeAhorro(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const [numRowsUpdated, updatedCajaDeAhorro] = await cajadeahorro.update(updates, {
        where: { id },
        returning: true,
      });
      if (numRowsUpdated === 0) {
        res.status(404).json({ error: 'Caja de ahorro no encontrada' });
      } else {
        res.status(200).json(updatedCajaDeAhorro[0]);
      }
    } catch (error) {
      console.error('Error al actualizar la caja de ahorro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async deleteCajaDeAhorro(req, res) {
    const { id } = req.params;
    try {
      const numCajasDeAhorroDeleted = await cajadeahorro.destroy({ where: { id } });
      if (numCajasDeAhorroDeleted === 0) {
        res.status(404).json({ error: 'Caja de ahorro no encontrada' });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      console.error('Error al eliminar la caja de ahorro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
}

module.exports = new CajaDeAhorroController();
