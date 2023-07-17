import { Box, Text } from "@chakra-ui/react"


const SearchResultArea = ({children, show}) => {
  return (
    <Box 
        width={{base:'80%', md:"500px"}} zIndex={300} bg={'gray.200'} position={'absolute'} top={"50%"} p="5px"
        left={"50%"} transform={"translate(-50%,-50%)"} height={"600px"} borderRadius={"4px"} display={'flex'} flexDirection={"column"}
        alignItems={"center"} overflow={'auto'}
        
    >
        <Text fontSize={"18px"} fontWeight={"bold"} my="10px">Select User</Text>
        {children}
    </Box>
  )
}

export default SearchResultArea