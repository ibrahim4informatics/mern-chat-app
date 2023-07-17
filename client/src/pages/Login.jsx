import { useState, useEffect } from "react";
import { Input,Button,FormControl,FormLabel, FormHelperText, FormErrorMessage,InputGroup, InputRightElement, Box, Heading } from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {motion} from 'framer-motion';
import styles from '../styles/login.module.css'
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";



export default function Login (){
    const [cookies,setCookie] = useCookies()
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [isInvalid, setIsInvalid] = useState(false);
    const navigateTo = useNavigate();
    const api_url = import.meta.env.VITE_API_URL;
    const hundleClick = ()=>{
        axios.post(`${api_url}/auth/login`, credentials)
        .then(res => {
            setCookie('token', res.data.token, {sameSite:true,secure:true, maxAge: 1000*3600*24, });
            toast.success('user logging in just sec')
            setTimeout(()=> navigateTo('/chats'), 2000)
            clearTimeout();
        })
        .catch (e => {
            if (e.response.status === 400){
                setIsInvalid(true)
            }
        })
    }

    useEffect(()=>{
        axios.get(`${api_url}/auth/check`, {headers:{Authorization:`Bearer ${cookies.token}`}})
        .then(res => res.status === 200 ? navigateTo('/chats') : navigateTo('/'))
        .catch(e => navigateTo('/'))
    }, [cookies]);
    return (
        <>
            <ToastContainer/>
            <Box className={`${styles.container}`} w="100%" height={"100vh"} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <motion.section  initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{duration:.8}} style={{width:"80%", maxWidth:"400px"}}>
            <Box w="100%" maxWidth={"400px"} bgColor="gray.100" p="20px" borderRadius={4}>
                <Heading textAlign={'center'} my="10px" color="primary.900" >Log-In</Heading>
                <FormControl isInvalid={isInvalid} my="10px">
                    <FormLabel>Email:</FormLabel>
                    <Input name="email" type="email" required placeholder="example@email.com" onChange={(e)=> {setCredentials({...credentials, email: e.target.value})}} />
                   
                    <FormErrorMessage>Email or Password Invalid</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={isInvalid} my="10px">
                    <FormLabel mb='5px'>Password:</FormLabel>
                    <InputGroup>
                    <Input mb="5px" name="password" type={showPassword ? "text" : "password"} required placeholder="*****" onChange= {(e)=> setCredentials({...credentials, password:e.target.value}) } />
                    <InputRightElement>
                        <Button onClick={()=> setShowPassword(prev => !prev)}>{showPassword ? <ViewOffIcon/>: <ViewIcon/>}</Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText color={"blackAlpha.600"}>if you dont have account signup</FormHelperText>
                    <FormErrorMessage>invalid email or password</FormErrorMessage>
                </FormControl>
                <Box my={10} w="100%" display="flex" alignItems={'center'} justifyContent={'space-evenly'}>
                    <Button onClick={()=> navigateTo('/register')} w="120px" colorScheme="secondary">Sign-Up</Button>
                    <Button onClick={hundleClick} w="120px" colorScheme="accent">Login</Button>
                </Box>
            </Box>
            </motion.section>
        </Box>
        </>
    )
}