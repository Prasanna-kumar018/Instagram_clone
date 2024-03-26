import React from 'react'
import { NotificationsLogo } from "../assets/assets";
import { Tooltip, Flex, Link, Box } from "@chakra-ui/react";
const Notification = () => {
  return (
    <Tooltip
      hasArrow
      label={"Notifications"}
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
      <Link className="hover_link">
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
            <NotificationsLogo/>
          </Box>
          <Box pl={"2.5vmin"} display={{ base: "none", md: "block" }}>
            {"Notifications"}
          </Box>
        </Flex>
      </Link>
    </Tooltip>
  );
}

export default Notification