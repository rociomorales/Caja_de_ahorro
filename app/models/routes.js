const express = require('express');
const router = express.Router();


//controladores

const UserController = require('../controllers/UserController');
const cajasController = require('../controllers/cajasController');

//Home
router.get('/',(req, res)=>res.json({foo:"bar"}));


//Users
router.get('/users',UserController.all)
router.get('/cajas',cajasController.all)


module.exports=router;