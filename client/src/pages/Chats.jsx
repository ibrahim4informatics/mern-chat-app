import { Box, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Aside from "../components/Aside";


export default function Chat (){
    return (
        <>
            {/* navbar */}
            <Navbar/>
            <Box width={"100%"} height={"calc(100vh - 68px)"} display={'flex'} justifyContent={{base:'center', md:'space-between'}}>
                <Aside/>
                <Box width={{base:"0", md:"80%"}}  display={{base:"none", md:"flex"}} alignItems={"center"} justifyContent={"center"}>
                    <Heading color="blackAlpha.400" size={"md"}>Start Chating</Heading>
                </Box>
            </Box>
            

        </>
    )
}