import React from 'react'
import Navbar from '../components/Navbar';
import Aside from '../components/Aside';
import { Avatar, Box, Text, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import {ArrowRightIcon} from '@chakra-ui/icons'
import {useParams} from 'react-router-dom'
import OwnMesssage from '../components/OwnMesssage';
import FriendMessage from '../components/FriendMessage';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from 'axios';
const SingleChat = () => {
    const {chat_id} = useParams();
    const [cookies] = useCookies();
    const api_url = import.meta.env.VITE_API_URL;
    const [chatInfo, getChatInfo] = useState(null);
    const [userInfo, getUserInfo] = useState(null);
    const [messageContent, setMessageContent] = useState(null);
    useEffect(()=>{

        axios.get(`${api_url}/users/user`, {headers:{Authorization:`Bearer ${cookies.token}`}})
        .then(res => getUserInfo(res.data.user_info))
        .catch(e => console.log(e.response.data))
        
        axios.get(`${api_url}/chat/${chat_id}`, {headers:{Authorization:`Bearer ${cookies.token}`}})
        .then(res => {console.log(res.data.chat); getChatInfo(res.data.chat)})
        .catch(e=> console.log(e.response.data))
    }, [chatInfo]);

    const hundleSend = ()=>{
        setMessageContent('')
        axios.post(`${api_url}/chat/${chat_id}/send`, {content:messageContent}, {headers:{Authorization:`Bearer ${cookies.token}`}})
        .then (res => {;res.status === 200 ? toast.success('message sent') : ""})
        .catch(e => toast.error('unable to send message!'))
    }
  return (
    <>
    <ToastContainer/>
    {/* navbar */}
    <Navbar/>
    <Box width={"100%"} height={"calc(100vh - 68px)"} display={'flex'} justifyContent={{base:'center', md:''}}>
        <Aside display={{base:"none", md:"block"}} />
        {chatInfo === null ? <Text>Loading</Text> :
        (<Box position={'relative'}  width={{base:"100%", md:"100%"}}  >
        {/* //! Chat Top Section */}
        <Box bgColor={'secondary.200'} borderBottomRadius={"10px"} width={"100%"} display={'flex'} alignItems={'center'} py="10px">
            <Avatar m="10px"  size={"md"} alignSelf={'flex-start'} name='ibrahim' src='' />
            <Text color={"white"} fontSize={"18px"} fontWeight={'bold'} ms="auto" me="auto">{chatInfo.users[0].id !== userInfo.id ? chatInfo.users[0].username : chatInfo.users[1].username}</Text>
        </Box>

        


       
        <Box position={"relative"}  width={"100%"} height={"calc(100vh - 68px - 88px)"} >

            
        {/* //! messages section */}
        <Box width={"100%"} height={"calc(100% - 60px)"} overflow={'auto'} display={'flex'} flexDirection={'column'}>
            
            {/* message component */}
            
            
            {chatInfo.messages.map(mes => {
                return mes.user_id === userInfo.id ? <OwnMesssage key={mes.id} content={mes.content} /> : <FriendMessage key={mes.id} content={mes.content}/>
            })}
        </Box>

             {/* //!: bottom section */}
            <Box width={"100%"}  p="10px" position={'fixed'} bottom={0}>
                <InputGroup  size={'lg'}>
                    <Input value={messageContent} onChange={(e)=> setMessageContent(e.target.value)} borderColor={'secondary.200'} _hover={{borderColor:"secondary.400"}} _focus={{borderColor:"secondary.800"}}  minHeight={"40px"} placeholder='write message..'/>
                    <InputRightElement onClick={hundleSend}>
                        <IconButton colorScheme='secondary'  icon={<ArrowRightIcon />}  />
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Box>
    </Box>)}
    </Box>

</>
  )
}

export default SingleChat