import { Flex, Avatar, Text, Button,Link } from "@chakra-ui/react";
import React from "react"; 
import useLogOut from "../hooks/useLogOut";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { Link as RouterLink } from "react-router-dom";
const SuggestionsHeader = () =>
{
 let {data:authuser} = useSelector(state => state.user)
 let { loading, error, abc } = useLogOut();
  let dispatch = useDispatch();
  if (!authuser)
    return (<>
    </>)
 if (error) {
   dispatch(
     popups.actions.add({
       content: "Unable to Sign Out...",
     })
   );
 }
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"full"}
      h={"10vmin"}
    >
      <Flex direction={"row"} gap={2} alignItems={""}>
        <Link to={"/" + authuser.username} as={RouterLink } >
        <Avatar name={authuser.username} src={authuser?.profilePicURL}></Avatar>
        </Link>
        <Text display={"inline-block"} my="auto" fontWeight={500}>
          {authuser?.username}
        </Text>
      </Flex>
      <Button
        className="btn btn-danger"
        variant={"danger"}
        mr={2}
        isLoading={loading}
        onClick={abc}
      >
        {" "}
        Logout{" "}
      </Button>
    </Flex>
  );
};

export default SuggestionsHeader;
