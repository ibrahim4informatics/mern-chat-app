import { useState,useEffect } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCookies } from "react-cookie";

export default function Register() {
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({});
  const [isEmailInValid, setIsEmailInvalid] = useState(false);
  const [isPassInvalid, setIsPassInvalid] = useState(false);
  const [isCPassInvalid, setIsCPassInvalid] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [cookies] = useCookies()
  const [errors, setErrors] = useState({
    password_err: "",
    email_err: "",
    c_pass_error: "",
    username_err: "",
  });
  const api_url = import.meta.env.VITE_API_URL;

  const changePassword = (e) => {
    setIsPassInvalid(false);
    if (e.target.value.trim().length < 8 || e.target.value.trim().length > 18) {
      setErrors({
        ...errors,
        password_err: "password must be between 8 and 18 character",
      });
      setIsPassInvalid(true);
    }
    setCredentials({ ...credentials, password: e.target.value });
  };
  const changeCPassword = (e) => {
    setIsCPassInvalid(false);
    if (e.target.value !== credentials.password) {
      setErrors({
        ...errors,
        c_pass_error:
          "make sure that the confirmed password is the same as the password",
      });
      setIsCPassInvalid(true);
    }

    setCredentials({ ...credentials, confirm_passowrd: e.target.value });
  };
  const changeEmail = (e) => {
    setIsEmailInvalid(false);
    const email = e.target.value;
    if (!email.includes("@")) {
      setErrors({
        ...errors,
        email_err:
          "invalid email form make sure that its in this form example@domain.com",
      });
      setIsEmailInvalid(true);
    }
    const [identifier, domain] = email.split("@");
    if (
      !domain.includes(".") ||
      identifier.includes(" ") ||
      domain.includes(" ")
    ) {
      setErrors({
        ...errors,
        email_err:
          "invalid email form make sure that its in this form example@domain.com",
      });
      setIsEmailInvalid(true);
    }
    if (identifier.length < 1 || domain.length < 1) {
      setErrors({ ...errors, email_err: "field is empty enter valid email" });
      setIsEmailInvalid(true);
    }

    setCredentials({ ...credentials, email });
  };
  const changeUsername=(e)=>{
    setIsUsernameInvalid(false);
    if(e.target.value.length > 20){
      setErrors({...errors, username_err:"username is too long"});
      setIsUsernameInvalid(true);
    }
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', ' ', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '<', '>', ',', '.', '?', '/'];

    specialCharacters.map(sc => {
      if (e.target.value.includes(sc)) {
        setErrors({...errors, username_err:"username contains space or special character remove it"});
        setIsUsernameInvalid(true)
      }
    })
    setCredentials({ ...credentials, username: e.target.value });
  };

  const hundleClick = () => {
    axios
      .post(`${api_url}/auth/register`, {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
        confirm_password: credentials.confirm_passowrd,
      })
      .then((res) => {
        toast.success("user created login in 2s")
        setTimeout(()=>navigateTo('/'), 2000);
        clearTimeout();
        
      })

      .catch((e) => {
        const message = e.response.data.message;
        if(message === "email used"){
          setErrors({...errors, email_err: message});
          setIsEmailInvalid(true);
        }

        if(message === "username used"){
          setErrors({...errors, username_err: message});
          setIsUsernameInvalid(true);
        }
      });
  };

  useEffect(()=>{
    axios.get(`${api_url}/auth/check`, {headers:{Authorization:`Bearer ${cookies.token}`}})
    .then(res => res.status === 200 ? navigateTo('/chats') : navigateTo('/'))
    .catch(e => navigateTo('/register'))
}, [cookies]);

  return (
    <>
      <ToastContainer />
      <Box
        className={styles.container}
        w="100%"
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "80%", maxWidth: "400px" }}
        >
          <Box
            w="100%"
            maxWidth={"400px"}
            bg="gray.100"
            p="20px"
            borderRadius={4}
          >
            <Heading textAlign={"center"} my="10px" color="primary.900">
              Sign-Up
            </Heading>
            <FormControl isInvalid={isEmailInValid} my="10px">
              <FormLabel>Email:</FormLabel>
              <Input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                onChange={changeEmail}
              />

              <FormErrorMessage>{errors.email_err}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isUsernameInvalid} my="10px">
              <FormLabel>Username:</FormLabel>
              <Input
                name="username"
                type="text"
                required
                placeholder="user_124"
                onChange={changeUsername}
              />

              <FormErrorMessage>{errors.username_err}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isPassInvalid} my="10px">
              <FormLabel mb="5px">Password:</FormLabel>
              <InputGroup>
                <Input
                  mb="5px"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="*****"
                  onChange={changePassword}
                />
                <InputRightElement>
                  <Button onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password_err}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isCPassInvalid} my="10px">
              <FormLabel mb="5px">Confirm Password:</FormLabel>
              <InputGroup>
                <Input
                  mb="5px"
                  name="conifrm_password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="*****"
                  onChange={changeCPassword}
                />
                <InputRightElement>
                  <Button onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={"blackAlpha.600"}>
                if you have account login
              </FormHelperText>
              <FormErrorMessage>{errors.c_pass_error}</FormErrorMessage>
            </FormControl>

            <Box
              my={10}
              w="100%"
              display="flex"
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button
                onClick={() => navigateTo("/login")}
                w="120px"
                colorScheme="secondary"
              >
                Log-In
              </Button>
              <Button onClick={hundleClick} w="120px" colorScheme="accent">
                Sign-Up
              </Button>
            </Box>
          </Box>
        </motion.section>
      </Box>
    </>
  );
}
