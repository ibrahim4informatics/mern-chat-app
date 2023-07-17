import { Box, Heading,Text, } from '@chakra-ui/react'
import React from 'react'
import SmallChat from './SmallChat'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Aside = ({display}) => {
  const api_url = import.meta.env.VITE_API_URL;
  const navigateTo = useNavigate();
  const [cookies] = useCookies();
  const [chats, getChats] = useState([]);
  const [userInfo, getUser] = useState({})
  useEffect(()=>{
    axios.get(`${api_url}/users/user`, {headers:{Authorization:`Bearer ${cookies.token}`}})
    .then(res => getUser(res.data.user_info))
    .catch(e=> { throw new Error(e.response) })
    axios.get(`${api_url}/chat`, {headers:{Authorization:`Bearer ${cookies.token}`}})
    .then(res => getChats(res.data.chats))
    .catch(e => {
      e.response.status === 401 ? navigateTo('/') : navigateTo('/chats')
    })
  }, [chats]);


  return (
    <Box display={display} zIndex={0} borderRight={"solid .7px rgba(0,0,0,.3)"} pt="10px" pr="10px" width={"100%"}  maxWidth={{base:"100%",md:"350px"}}>
        <Heading textAlign={'center'} my="10px" color={"accent.600"}>Chats</Heading>
        <Box className='aside-chats-container' height={"calc(100% - 80px)"} overflow={'auto'}>
            {
              chats.length > 0 ? (
                chats.map(chat =>{ 
                return (
                  <SmallChat 
                    key={chat.id} 
                    id={chat.id}
                    username={chat.users[0].id !== userInfo.id ? chat.users[0].username : chat.users[1].username} 
                    last_message= {chat.last_message} 
                  />
                
                )
              })
              )
              :(<Text textAlign={'center'} mt="10px" color={'blackAlpha.400'}>No Chats Here</Text>)
            }
        </Box>
    </Box>
  )
}

export default Aside