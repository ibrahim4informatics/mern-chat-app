const express = require("express");
const router = express.Router();

//! : importation des controller
const { 
    createChat, getChats, getChat,deleteChat, sendMessage 
} = require("../controllers/chatController");

//!: importation du midlewares
const isAuth = require("../midlewares/isAuth");

//!: Creation du Chat => POST http://localhost:3001/api/chat/create
router.route("/create").post(isAuth, createChat);

router.route("/").get(isAuth, getChats);
router.route("/:chat_id").get(isAuth, getChat);
router.route('/delete/:chat_id').delete(isAuth, deleteChat);

router.route("/:chat_id/send").post(isAuth, sendMessage);

module.exports = router;
