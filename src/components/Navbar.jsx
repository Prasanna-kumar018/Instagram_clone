import React from "react";
import "./Navbar.css";
import { Box, Flex, Tooltip, Link,Button, Avatar} from "@chakra-ui/react";
import {Stack } from "react-bootstrap"
import Search from "./Search";
import Profile from "./Profile";
import
{
  InstagramLogo,
  InstagramMobileLogo,
} from "../assets/assets";
import { Link as RouterLink } from "react-router-dom";
import { HomeNav } from "../components/HomeNav";
import useLogOut from "../hooks/useLogOut";
import CreatePost from "./createPost";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { popups } from "../slice/popup_Slice";
export function Navbar()
{
  let { loading, error, abc } = useLogOut();
  let dispatch = useDispatch();
  if (error)
  {
    dispatch(
      popups.actions.add({
        content: "Unable to Sign Out...",
      })
    );
  }
   return (
    <Box pos="sticky" h={"100vh"} top={0} left={0} bottom={0}>
      <Stack direction="vertical" className="navbar_custom" gap={4}>
        <Link
          to={"/"}
          as={RouterLink}
          className="insta"
          display={{
            base: "none",
            md: "block",
          }}
        >
          <InstagramLogo />
        </Link>

        <Link
          to={"/"}
          as={RouterLink}
          display={{ base: "block", md: "none" }}
          p={{ md: "1vmin", base: "3vmin" }}
          mx="auto"
          className="scale"
          borderRadius={{ md: "0", base: "10px" }}
        >
          <InstagramMobileLogo />
        </Link>

         <Flex direction={"column"} gap={{ md: 2, base: 4 }} height={"100vh"}>
           <HomeNav />
           <Search />
           <CreatePost />
           <Notification />
           <Profile/>
           <Tooltip
            hasArrow
            label={"LogOut"}
            openDelay={500}
            placement="right"
            fontSize={"1.2em"}
            padding-left={"3vmin"}
            padding-right={"3vmin"}
            padding-top={"1.5vmin"}
            padding-bootm={"1.5vmin"}
            className="shadow"
            ml={"2vmin"}
          >
            <Link
              bg={"dark"}
              mt="auto"
              mb={"10px"}
              className="hover_link"
              to={"/auth"}
              as={RouterLink}
            >
              <Flex
                padding={{ base: "0", md: "1.1vmin" }}
                justifyContent={{ base: "center", md: "stretch" }}
                alignItems={"center"}
              >
                <Box
                  width={{ base: "fit-content", md: "max-content" }}
                  ml={{ base: "0", md: "2vmin" }}
                  className="jump "
                  padding={{ md: "0", base: "3vmin" }}
                  borderRadius={{ md: 0, base: "10px" }}
                  justifyItems={{ base: "start", md: "stretch" }}
                >
                  <BiLogOut size={30} />
                </Box>
                <Box pl={"2.5vmin"}
                  as={Button}
                   backgroundColor={"transparent"}
                   isLoading={loading}
                   display={{ base: "none", md: "block" }}
                   onClick={abc}
                >
                  LogOut
                </Box>
              </Flex>
            </Link>
          </Tooltip>
        </Flex>
      </Stack>
    </Box>
  );
}
