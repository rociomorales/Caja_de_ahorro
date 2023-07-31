'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CajaDeAhorro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CajaDeAhorro.init({
    nombre: DataTypes.STRING,
    municipio: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CajaDeAhorro',
  });
  return CajaDeAhorro;
};