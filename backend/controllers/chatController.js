const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createChat = async (req, res) => {
  /**
   * ! 1- Get id of user and the second user
   */
  const sender_user_id = req.user_id;
  const receiver_user_id = req.body.receiver;

  const receiverExist = await prisma.user.findUnique({
    where: { id: receiver_user_id },
  });
  if (!receiverExist)
    return res.status(404).json({ message: "utilisateur n'existe pas" });

  const chatExist = await prisma.chat.findFirst({
    where: {
      users: {
        every: { OR: [{ id: sender_user_id }, { id: receiver_user_id }] },
      },
    },
  });
  if (chatExist !== null)
    return res.status(400).json({ message: "Chat Already Exist" });

  const chat = await prisma.chat.create({
    data: {
      title: Date.now().toString(),
      users: { connect: [{ id: sender_user_id }, { id: receiver_user_id }] },
    },
  });
  return res.status(200).json({ chat });
};

const getChat = async (req, res) => {
  const user_id = req.user_id;
  const chat_id = req.params.chat_id;
  const chat = await prisma.chat.findUnique({
    where: { id: chat_id },
    include: {
      users: true,
      messages: { include: { user: true }, orderBy:{created_at:"asc"} },
    },
  });

  if (!chat) return res.status(404).json({ message: "chat doesn't exist" });
  if (user_id !== chat.users[1].id && user_id !== chat.users[0].id)
    return res.status(401).json({ message: "couldnt get this chat" });
  return res.status(200).json({ chat });
};

const getChats = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user_id },
    include: { chats: { include: { users: true } } },
  });
  const chats = user.chats;
  return res.status(200).json({ chats });
};

const deleteChat = async (req, res) => {
  const user_id = req.user_id;
  const chat_id = req.params.chat_id;

  const chat = await prisma.chat.findUnique({
    where: { id: chat_id },
    include: { users: true },
  });

  if (chat.users[0].id !== user_id && chat.users[1].id !== user_id)
    return res.status(401).json({ message: "cannot delte this chat" });

  await prisma.chat.delete({ where: { id: chat_id } });
  return res.status(200).json({ message: "chat deleted" });
};

const sendMessage = async (req,res)=>{
  const sender_id = req.user_id;
  const {chat_id} = req.params;
  const {content} = req.body;

  let users_id_chat = [];

  try {

    const chat = await prisma.chat.findUnique({
      where:{id: chat_id},
      include: {users:true}
    })

    chat.users.map(user => users_id_chat.push(user.id) );

    if (!chat) return res.status(404).json({message: "Chat not fount"});
    if(!users_id_chat.includes(sender_id)) return res.status(401).json({message: "can't send message!"});
    if(!content) return res.status(400).json({message: "no message sent"});

    const message = await prisma.message.create({
      data: {
        content,
        chat_id,
        user_id : sender_id,
      }
    })

    await prisma.chat.update({where: {id: chat_id}, data:{last_message_id: message.id}});
    return res.status(200).json({message, chat});
  }
  catch (e){
    console.log(e);
    return res.status(500).json({message: "Error Ocured!"})
  }
}

module.exports = {
  createChat,
  getChats,
  getChat,
  deleteChat,
  sendMessage,
};
