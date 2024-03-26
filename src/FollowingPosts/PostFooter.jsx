import { Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Box,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../assets/assets";
import CommentComponent from "../components/commentComponent";
import useAddComment from "../hooks/useAddComment";
import useGetHeader from "../hooks/useGetHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";


const PostFooter = ({ createdBy, comments, caption, objuid }) => {
  let [isliked, setisliked] = React.useState(false);
  let { isOpen, onOpen, onClose } = useDisclosure();
  let [comment, setcomment] = React.useState("");
  let [user] = useAuthState(auth);
  let dispatch = useDispatch();
  let { isloading, abc } = useAddComment();
  let { loading, result } = useGetHeader(createdBy);
  if (loading || !user)
  {
    return;
  }
  

  return (
    <Flex direction={"column"} p={2}>
      <Flex
        direction={"row"}
        gap={2}
        justifyContent={"flex-start"}
        alignItems={"center"}
        pb={1}
      >
        <Box
          onClick={() => {
            setisliked((b) => {
              return !b;
            });
          }}
        >
          {!isliked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <CommentLogo />
      </Flex>
      <Text m={0}>{isliked ? 4 : 3} likes </Text>
      <Text m={1} fontWeight={"500"} ml={0}>
        {" "}
        {caption}
      </Text>
      <Button
        className="text-start bg-transparent"
        variant="transparent"
        color={"black"}
        _focus={{
          WebkitTextStroke: "2px black",
        }}
        mr={"auto"}
        pl={0}
        onClick={() => {
          onOpen();
        }}
      >
        View all {comments.length} Comments
      </Button>
      <InputGroup mx={2} w={"auto"}>
        <Input
          placeholder="Add a comment..."
          border={"none"}
          w={"100%"}
          rounded={0}
          onChange={(e) => {
            console.log(comment);
            setcomment(e.target.value);
          }}
          value={comment}
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
            onClick={() => {
              if (comment.length === 0) {
                dispatch(
                  popups.actions.add({
                    content: "The comment is Empty",
                  })
                );
              } else {
                abc(result, comment,objuid,createdBy);
                setcomment("");
              }
            }}
            isLoading={isloading}
          >
            Post
          </Button>
        </InputRightElement>
      </InputGroup>
      <CommentComponent
        result={result}
        onClose={onClose}
        onOpen={onOpen}
        objuid={objuid}
        isOpen={isOpen}
      />
    </Flex>
  );
};

export default PostFooter;
