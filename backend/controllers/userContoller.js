const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const bcrypt = require("bcrypt");

//! firebase import
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

// ! => firebase config
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// ! iniitaize firevase app
initializeApp(firebaseConfig);
const storage = getStorage();

// todo => validate files to be just images
const isValid = (file) => {
  const AllowedExtentions = [".png", ".jpg", ".jpeg"];
  const file_extention = path.extname(file.name);

  return AllowedExtentions.includes(file_extention) ? true : false;
};


const getUserInfo =  async (req,res) =>{
  const user_id = req.user_id;
  const user_info = await prisma.user.findUnique({where:{id:user_id}});
  return res.status(200).json({user_info});
}


const getUsers = async (req, res) => {
  const { u } = req.query;
  if (!u.trim())
    return res
      .status(400)
      .json({ message: "enter username to search for user" });
  try {
    const users = await prisma.user.findMany({
      where: {
        username: { contains: u.trim() },
        id: { not: req.user_id },
      },
    });

    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Sorry Error Ocured :'(" });
  }
};

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const picture = req.files?.pic;
  const salt = bcrypt.genSaltSync(12);

  let picture_url = undefined;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user_id } });

    if (picture !== undefined) {
      if (!isValid(picture))
        return res
          .status(400)
          .json({ message: "Images accepted format:(png,jpg,jpeg)" });
      const storageRef = ref(
        storage,
        `/pictures/${Date.now()}/${picture.name}`
      );
      const metadata = { contentType: picture.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        picture.data,
        metadata
      );
      picture_url = await getDownloadURL(snapshot.ref);
    }
    let hash = undefined;
    if (password !== undefined){
      hash = bcrypt.hashSync(password, salt);
    }

    await prisma.user.update({
      where: { id: req.user_id },
      data: {
        username: username || user.username,
        email: email || user.email,
        password: hash || user.password,
        picture: picture_url || user.picture,
      },
    });

    return res.status(200).json({ message: "user updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error Ocured!" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user_id } });
    return res.status(200).json({ message: "user deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error Ocured !" });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserInfo,
};
