// !: importation des  modules
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//! 1- Créer un utilisateur controlleur
const registerUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const { username, email, password, confirm_password } = req.body;
    if (!username || !email || !password || !confirm_password) return res.status(400).json({ message: "remplire tous les champs!" });
    try {
        const user_email = await prisma.user.findUnique({ where: { email } });
        const user_username = await prisma.user.findUnique({ where: { username } });
        if (user_email) return res.status(400).json({ message: "email used" });
        if (user_username) return res.status(400).json({ message: "username used" });
        if (password !== confirm_password) return res.status(400).json({ message: "passwords doesn't match" });
        if(username.length > 20) return res.status(400).json({message:"username is too long"});
        if (password.length < 8 || password.length > 18) return res.status(400).json({message: "password must be between 8 and 18 character",});
        
        try {
            await prisma.user.create({data:{email, username, password: bcrypt.hashSync(password, salt)}});
            return res.status(200).json({message: "utilisateur été crèer"});
        }
        catch (err) {
            return res.status(500).json({message:err});
        }
    } catch (err){
        return res.status(500).json({message: err});
    }
};
//! 2- Connexion a L'utilisateur controlleur
const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({where:{email}});
        if(!user) return res.status(404).json({message: "invalid email or password"});
        if(bcrypt.compareSync(password, user.password) !== true) return res.status(400).json({message: "invalid email or password"});
        const token = jwt.sign({user: user.id}, process.env.AUTH_SECRET, {expiresIn: "1d"});
        return res.status(200).json({message:'user logged in', token})
    }
    catch (err){
        return res.status(500).json({message:err});
    }

}


// ! check if user logged in 
const checkUserLogin = (req,res)=>{
    return res.status(200).json({message:"user is logged"});
}

//! 3- exportation des controlleur
module.exports = {
  registerUser, loginUser,checkUserLogin,
};
