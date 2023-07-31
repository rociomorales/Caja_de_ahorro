const {Sequelize, DataTypes} = require('sequelize');
const config= require('../../config/database')
const db ={}

db.connection = new Sequelize(config.database,config.username, config.password,config);
// db.User=require('../models/User')(db.connection,DataTypes);
// db.cajasahorro=require('../models/cajasahorro')(db.connection,DataTypes);

//Vinculamos nuestros modelos a la Base de Datos
db.admin=require('../models/admin')(db.connection,DataTypes);
db.cajadeahorro=require('../models/cajadeahorro')(db.connection,DataTypes);
db.User=require('../models/User')(db.connection,DataTypes);
db.superAdmin=require('../models/superAdmin')(db.connection,DataTypes);

module.exports = db;