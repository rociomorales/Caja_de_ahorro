const jwt = require('jsonwebtoken');
const { connection } = require('./database/db')
const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const keys = require('./settings/keys');

app.set('key', keys.key);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

const users={
  'admin':'12345',
  'admin2':'123456'
};

app.post('/login', (req, res) => {
  const username = req.body.usuario;
  const password = req.body.pass;
  // if (req.body.usuario == 'admin' && req.body.pass == "12345") {
  if(users[username]&&users[username]== password){
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('key'), {
      expiresIn: '7d'
    });
    res.cookie('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'strict'
    })
    res.json({
      message: '¡AUTENTIFICAION EXITOSA!',
      token: token
    })
  }else{
    res.json({
      message:'Usuario y/o password son incorrectos'
    })
  }
})

const verificacion =express.Router();
verificacion.use((req,res,next)=>{
  // let token =req.headers['x-access-token']||req.headers['authorization'];
  // console.log(token);
  let token = req.cookies['token'];
  if (!token) {
    res.status(401).send({
      error:'Es necesario un token de atentificación'
    })
    return
  }
  // if (token.startsWith('Bearer ')) {
  //   token= token.slice(7,token.length);
  //   console.log(token);
  // }
  if (token) {
    jwt.verify(token,app.get('key'),(error,decoded)=>{
      if (error) {
        return res.json({
          message:'El token no es valido'
        });
      }else{
        req.decoded=decoded;
        next();
      }
    })
  }

});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});


module.exports={app,verificacion}

// app.get('/info',verificacion,(req,res)=>{
  
//    res.json('INFORMACION IMPORTANTE ENTREGADA');
// })

app.use(require('./routes/routesAdmin'));
app.use(require('./routes/routesCajas'));
app.use(require('./routes/routesUser'));



const usersRouter = require('./routes/routesUser');
const { password, username } = require('../config/database');

app.use('/users', usersRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);

  connection.sync({ force: false }).then(() => {
    console.log("Se ha establecido la conexión");
  })
})