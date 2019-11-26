'use strict';
const Usuario = require('../../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creamos un Controller que nos servirá para asociar rutas en app.js

class LoginController {

  async loginJWT(req, res, next) {
    try {
      // recoger credenciales de la petición
      const {email, password} = req.body;
      
      // buscar el usuario en BD
      const usuario = await Usuario.findOne({ email });
      console.log('el email es:', email)
      console.log('el pass es:', password)
      console.log('el usuario es:', usuario)
      

      // si no lo encontramos le decimos que no
      if (!usuario || !await bcrypt.compare(password, usuario.password)) {
        res.json({ success: false, error: ('Invalid credentials') });
        
        return;
      }

      // creamos un JWT
      // no meter una instancia de mongoose en el Payload!!!!!!!!
      const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });

      // respondemos
      res.json({ success: true, token: token });

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new LoginController();
