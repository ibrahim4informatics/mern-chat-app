import { Box } from "@chakra-ui/react"


const OwnMesssage = ({content}) => {
  return (
    <Box 
        borderRadius={"10px"} alignSelf={'flex-end'} padding={"8px"} my="12px" m="12px" bg={"primary.100"} width={"auto"} maxWidth={"40%"}
    >
       {content}
    </Box>

  )
}

export default OwnMesssage