import React from "react";
import {
  Flex,
  Image,
  Box,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Modal,
  Text,
  ModalOverlay,
} from "@chakra-ui/react";
import RightSideItem from "./RightSideItem";
import { useDisclosure } from "@chakra-ui/react";
const UnlikeLogo = () => (
  <svg
    aria-label="Unlike"
    color="rgb(255, 255, 255)"
    fill="rgb(255, 255, 255)"
    height="24"
    role="img"
    viewBox="0 0 48 48"
    width="24"
  >
    <title>Unlike</title>
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

const MessagesLogo = () => (
  <svg
    aria-label="Messenger"
    color="rgb(255, 255, 255)"
    fill="white"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.739"
    ></path>
    <path
      d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const GridCustom = ({
  caption,
  createdBy,
  comments,
  createdAt,
  likes,
  objuid,
  postImage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    return (
    <>
      <Box
        pos={"relative"}
        onClick={() => {
          onOpen();
        }}
        aspectRatio={1/1}
      >
        <Image src={postImage} w={"100%"} h={"100%"}></Image>
        <Flex
          pos={"absolute"}
          w={"100%"}
          h={"100%"}
          zIndex={1}
          opacity={0}
          inset={0}
          _hover={{
            backgroundColor: "blackAlpha.700",
            opacity: "1",
            fill: "white",
            cursor: "pointer",
          }}
          cursor={"pointer"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex gap={3} color={"white"}>
            <UnlikeLogo />
            <Text>{ likes.length}</Text>
            <MessagesLogo />
            <Text>{comments.length}</Text>
          </Flex>
        </Flex>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody background={"white"}>
            <Flex
              direction={"row"}
              gap={6}
              w={{ base: "90%", md: "full", sm: "70%" }}
              h={"90vmin"}
            >
              <Box flex={"1.5"}>
                <Image
                  src={postImage}
                  className="suggest-shadow"
                  w="100%"
                  h={"100%"}
                />
              </Box>
              <RightSideItem
                caption={caption}
                createdBy={createdBy}
                objuid={objuid}
                comment={comments}
                createdAt={createdAt}
                  />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GridCustom;
