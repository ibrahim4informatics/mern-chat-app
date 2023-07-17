import {
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
  Input,
  Avatar,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/navbar.module.css";
import logo from "../assets/logo.png";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import SearchResultArea from "./SearchResultArea";
import SearchUserComp from "./SearchUserComp";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Navbar() {
  const [cookies] = useCookies();
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const api_url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (searchUser.length > 0) {
      axios
        .get(`${api_url}/users?u=${searchUser}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setSearchResult(res.data.users);
        })
        .catch((e) => setSearchResult([]));
    }
  }, [searchUser]);
  return (
    <>
      <Box
        position={"sticky"}
        top="0"
        zIndex={100}
        w="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        boxShadow={"0 0 8px 4px rgba(0,0,0,.4)"}
        p="4px"
        bgColor={"white"}
      >
        <img className={`${styles.logo}`} src={logo} alt="logo-here" />
        <InputGroup width={{ base: "80%", md: "300px" }}>
          <Input
            onChange={(e) => setSearchUser(e.target.value)}
            bgColor={"white"}
            placeholder="search for user..."
          />
          <InputRightElement>
            <IconButton
              onClick={() => console.log(searchUser)}
              variant={"solid"}
              icon={<SearchIcon />}
            />
          </InputRightElement>
        </InputGroup>
        <Avatar
          size={"md"}
          m="5px"
          src="https://images.freeimages.com/fic/images/icons/2711/free_icons_for_windows8_metro/512/guest.png"
        />
      </Box>
      {searchUser.trim().length > 0 ? (
        <motion.section
          key={Date.now()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SearchResultArea show={searchUser.trim().length > 0 ? true : false}>
            {searchResult.length > 0 ? (
              searchResult.map((user) => (
                <Box
                key={user.id}
                  w="100%"
                  cursor={"pointer"}
                >
                  <SearchUserComp id={user.id} username={user.username} />
                </Box>
              ))
            ) : (
              <Text mt={"10px"} color={"blackAlpha.400"}>
                not found
              </Text>
            )}
          </SearchResultArea>
        </motion.section>
      ) : (
        ""
      )}
    </>
  );
}
