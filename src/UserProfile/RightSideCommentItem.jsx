import React from "react";
import {
  Text,
  Avatar,
  Flex,
  VStack,
} from "@chakra-ui/react";
import useGetTime from "../utils/useGetTime"
const RightSideCommentItem = ({ comment, createdAt, profilePicURL, username }) => {
  let value = useGetTime(createdAt);
  return (
    <Flex alignItems={"center"} gap={2} wordBreak={"break-word"}  >
      <Avatar name={username} size={"md"} src={profilePicURL} />
      <VStack gap={1} alignItems={"start"}>
        <Text m="0" fontFamily={"var(--f2)"}>{ username}</Text>
        <Text m={0} fontSize={"medium"}>{comment}</Text>
        <Text m={0}>{value }</Text>
      </VStack>
    </Flex>
  );
};

export default RightSideCommentItem;
