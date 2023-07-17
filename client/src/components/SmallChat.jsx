import {Box ,Heading,Avatar, Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const SmallChat = ({username, picture, last_message, id}) => {

  const navigateTo = useNavigate();


  const hundleClick = ()=>{
    navigateTo(`/chats/${id}`)
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
        {last_message ? (
          <Box alignItems={"center"} display={'flex'} ml="10px">
          <Text fontWeight={'bold'} mr="10px">last message:</Text><Text fontWeight={'light'} fontSize={"14px"}>{last_message}</Text>
        </Box>
        ) : ""}
      </Box>
       
    </Box>
  )
}

export default SmallChat