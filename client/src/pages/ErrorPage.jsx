import {useRouteError} from 'react-router-dom'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/not_found.svg'

export default function ErrorPage  (){
    const navigateTo = useNavigate();
    const err = useRouteError();
    return (
        <Box display={'flex'} w="100%" height="100vh" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <img className=' error-page-image animate-error-page' src={illustration} alt="image" />
            <Heading margin={10} color='accent.600' size="2xl">Oops!</Heading>
            <Text fontWeight={'bold'} mt={10} color={'blackAlpha.600'}>{err.statusText || err.message || "Error Ocured"}</Text>
            <Button onClick={()=> navigateTo('/')} mt={10} px={8} py={4} colorScheme='accent'>Go Home</Button>
           
        </Box>
    )
}