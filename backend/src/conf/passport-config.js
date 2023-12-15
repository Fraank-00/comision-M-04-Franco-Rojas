// passport-config.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/usuariosModel'); // Reemplaza con la ruta correcta a tu modelo de usuario

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'hola'; // Reemplaza con tu secreto JWT

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const usuario = await Usuario.findById(jwt_payload.id);
      if (usuario) {
        return done(null, usuario);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
