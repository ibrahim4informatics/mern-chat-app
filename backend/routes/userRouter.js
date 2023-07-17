const express = require("express");
const router = express.Router();

const {getUsers,updateUser, deleteUser, getUserInfo} = require('../controllers/userContoller');
const isAuth = require("../midlewares/isAuth");

router.route('/').get(isAuth, getUsers);
router.route('/update').put(isAuth, updateUser);
router.route('/delete').delete(isAuth, deleteUser);
router.route('/user').get(isAuth, getUserInfo);


module.exports = router;
