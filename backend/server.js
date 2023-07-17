// !-1: importing modules nedded
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const expressFileUpload = require('express-fileupload')
const app = express();
// !-2: using midlewares
dotenv.config();
app.use(expressFileUpload());
app.use(cors());
app.use(express.json());

// !-3: initilaize application
const port = process.env.PORT ?? 3000;


// !-4: setup routes
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/chat', require('./routes/chatRouter'));
app.use('/api/users', require('./routes/userRouter'));

// !-5:hundle 404 routes
app.use('*', (req,res)=>res.status(404).json({message: "le route est introuvable"}));

// !-6 listnening to the server
app.listen(port, ()=> console.log(`server is running on : http://localhost:${port}`));