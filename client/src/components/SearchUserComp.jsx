import {Box ,Heading,Avatar, Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const SearchUserComp = ({username, picture,id}) => {
    const [cookies] = useCookies()
    const api_url = import.meta.env.VITE_API_URL;
    const navigateTo = useNavigate();


  const hundleClick = ()=>{
    axios.post(`${api_url}/chat/create`, {receiver: `${id}`}, {headers:{Authorization:`Bearer ${cookies.token}`}})
    .then(res => navigateTo(`/chats/${res.data.chat.id}`))
    .catch(e => console.log(e.response))
  }
  return (
    <Box 
      alignItems={'center'} bg={"primary.200"} margin="10px auto" width={"80%"} maxWidth={"420px"} 
      p="12px" borderRadius="10px" display={'flex'} cursor={"pointer"} onClick={hundleClick}
      _hover={{backgroundColor:"primary.500", transition:"500ms"}}
    >
      <Avatar name={ picture === undefined ? username : ''} src={picture || ''}/>
      <Box>
        <Text fontSize={"18px"} fontWeight={'bold'} ml="10px" color='accent.600'>@{username}</Text>
      </Box>
       
    </Box>
  )
}

export default SearchUserComp