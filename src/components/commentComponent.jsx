import React from "react";
import {
  Button,
    Flex,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
    ModalHeader,
  HStack,Link,Avatar,
  ModalOverlay,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetHeader from "../hooks/useGetHeader";
const CommentComponent = ({ isOpen, onClose, objuid, result }) => {
  if (!result) return;
    let res = result.posts.filter((i) =>
    {
      if (i.objuid === objuid)
        return i.comments
    });
    console.warn(res[0].comments);
  return(
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent
        color={"white"}
        bg={"black"}
        border={"1px solid gray"}
        maxW={"400px"}
      >
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
          >
            {res[0].comments &&
              res[0].comments.map((item) => {
                  
                return (
                  <Flex
                    direction={"row"}
                    w={"full"}
                    gap={2}
                    justifyContent={"space-between"}
                  >
                    <HStack gap={2}>
                      <Link to={"/" + item.username} as={NavLink}>
                        {" "}
                        <Avatar
                          name={item.username}
                          border={"1px solid white"}
                          src={item.profilePicURL}
                        />
                      </Link>
                      <Flex direction={"column"} gap={0}>
                        <Flex direction={"row"} gap={1}>
                          <Text
                            color={"white"}
                            fontWeight={"bold"}
                            wordBreak={"break-word"}
                            m={1}
                          >
                            {item.username}
                          </Text>
                          <Text
                            color={"white"}
                            fontWeight={"bold"}
                            wordBreak={"break-word"}
                            m={1}
                          >
                            {item.comment}
                          </Text>
                        </Flex>

                        <Text color={"gray"} fontSize={".9rem"} ml={1}>
                          {" "}
                          {item.followers?.length} followers
                        </Text>
                      </Flex>
                    </HStack>
                  </Flex>
                );
              })}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentComponent;

