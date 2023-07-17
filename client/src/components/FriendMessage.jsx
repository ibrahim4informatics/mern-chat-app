import { Box } from '@chakra-ui/react'


const FriendMessage = ({content}) => {
  return (
    <Box 
    borderRadius={"10px"} alignSelf={'flex-start'} padding={"8px"} my="12px" m="12px" bg={"blackAlpha.100"} width={"auto"} maxWidth={"40%"}
>
   {content}
</Box>
)
}

export default FriendMessage