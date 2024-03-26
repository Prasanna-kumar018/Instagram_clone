import React from "react";
import {
  Flex,
  Avatar,
  Text,
  VStack,
  InputGroup,
  Box,
  InputRightElement,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDispatch
 } from "react-redux";
 import useAddComment from "../hooks/useAddComment";
import { MdDelete } from "react-icons/md";
import RightSideCommentItem from "./RightSideCommentItem";
import { MessagesLogo, NotificationsLogo, UnlikeLogo } from "../assets/assets";
import useGetHeader from "../hooks/useGetHeader";
import { popups } from "../slice/popup_Slice";
import useGetTime from "../utils/useGetTime";
const RightSideItem = ({ caption, createdBy, objuid, comment, createdAt }) => {

  console.warn("redfsdfsfdsf", createdBy);
  let { loading, result } = useGetHeader(createdBy);
  let [like, setlike] = React.useState(false);
  let [comments, setcomment] = React.useState("");
  let value =useGetTime(createdAt);
  // console.warn("commet", comment);
  // console.warn("header", result);
  let dispatch = useDispatch();
  let { isloading, abc } = useAddComment();
    if (!loading && result)
  {
    return (
      <Flex
        direction={"column"}
        gap={2}
        flex={1}
        display={{ base: "none", md: "flex" }}
        p={2}
      >
        <Flex
          alignItems={"center"}
          gap={2}
          borderBottom={"1px solid black"}
          p="1"
          pb={3}
        >
          <Avatar
            name={result.username}
            size={"md"}
            src={result.profilePicURL}
          />
          <Text m={0} mr={"auto"}>
            {result.username}
          </Text>
          <Box _hover={{ color: "red", cursor: "pointer" }}>
            <MdDelete size={50} />
          </Box>
        </Flex>
        <Flex overflowY={"scroll"} h={"60vmin"} direction={"column"} gap={3}>
          {comment &&
            comment.map((item) => {
              return (
                <RightSideCommentItem
                  comment={item.comment}
                  createdAt={item.createdAt}
                  profilePicURL={item.profilePicURL}
                  username={item.username}
                />
              );
            })}
        </Flex>
        <VStack alignItems={"start"}>
          <Flex gap={3}>
            <Box
              onClick={() => {
                setlike((b) => {
                  return !b;
                });
              }}
            >
              {like ? <NotificationsLogo /> : <UnlikeLogo />}
            </Box>
            <MessagesLogo />
          </Flex>
          <Text m={0}>{like ? 4 : 5} likes</Text>
          <Text m={0}>{caption}</Text>
          <Text m="0">Posted {value}</Text>
          <InputGroup mx={2} w={"full"}>
            <Input
              placeholder="Add a comment..."
              border={"none"}
              w={"100%"}
              rounded={0}
              onChange={(e) => {
                console.log(comments);
                setcomment(e.target.value);
              }}
              value={comments}
              _focus={{ boxShadow: "none", borderBottom: "2px solid black " }}
            />
            <InputRightElement>
              <Button
                mr={2}
                px={3}
                background={"transparent"}
                _hover={{
                  background: "transparent",
                  color: "red",
                }}
                _focus={{ WebkitTextStroke: "1.1px  black" }}
                isLoading={isloading}
                onClick={() => {
                  if (comments.length === 0) {
                    dispatch(
                      popups.actions.add({
                        content: "The comment is Empty",
                      })
                    );
                  } else {
                    abc(result, comments, objuid, createdBy);
                    setcomment("");
                  }
                }}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Flex>
    );
    }

};

export default RightSideItem;
