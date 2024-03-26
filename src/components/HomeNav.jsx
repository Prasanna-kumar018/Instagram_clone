import React from 'react'
import { Tooltip,Link,Box,Flex } from '@chakra-ui/react';
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from 'react-router-dom';
export const HomeNav = () =>
{
    return (
      <Tooltip
        hasArrow
        label={"Home"}
        openDelay={500}
        placement="right"
        bg={"black"}
        fontSize={"1.2em"}
        padding-left={"3vmin"}
        padding-right={"3vmin"}
        padding-top={"1.5vmin"}
        padding-bootm={"1.5vmin"}
        className="shadow"
        ml={"2vmin"}
      >
        <Link className="hover_link" to={"/"} as={RouterLink}>
          <Flex
            padding={{ base: "0", md: "1.1vmin" }}
            justifyContent={{ base: "center ", md: "stretch" }}
          >
            <Box
              width={{ base: "fit-content", md: "max-content" }}
              ml={{ base: "0", md: "2vmin" }}
              className="jump "
              padding={{ md: "0", base: "3vmin" }}
              borderRadius={{ md: 0, base: "10px" }}
              justifyItems={{ base: "start", md: "stretch" }}
            >
              <AiFillHome size={25} />
            </Box>
            <Box pl={"2.5vmin"} display={{ base: "none", md: "block" }}>
              {"Home"}
            </Box>
          </Flex>
        </Link>
      </Tooltip>
    );
}

export default HomeNav