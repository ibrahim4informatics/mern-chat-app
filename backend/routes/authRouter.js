const express = require('express');
const router = express.Router();

const isAuth = require('../midlewares/isAuth')

// ! import controllers and midlewares
const {registerUser,loginUser, checkUserLogin} = require('../controllers/authController')

//!: 1- creation d'un utilisateur => POST -> http://localhost:3001/api/auth/register <-----> body = {email,username,password,confirm_password}
router.route('/register').post(registerUser);

//! 1- connexion a un utilisateur => POST -> http://localhost:3001/api/auth/login <-----> body = {email,password}
router.route('/login').post(loginUser);

router.route("/check").get(isAuth, checkUserLogin);

module.exports = router;