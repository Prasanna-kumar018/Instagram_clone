import { Flex, Avatar, HStack, Text, Button,Link } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";
import {NavLink } from "react-router-dom";
import useFollow from "../hooks/useFollow";
const SuggestionComponent = ({ username, profilePicURL,followers,following ,uid}) => {
  let [user] = useAuthState(auth);
  let  { loading, abc } = useFollow();
  return (
    <Flex direction={"row"} w={"full"} gap={2} justifyContent={"space-between"}>
      <HStack gap={2}>
        <Link to={"/"+username} as={NavLink}>
          {" "}
          <Avatar name={username} src={profilePicURL} />
        </Link>
        <Flex direction={"column"} gap={0}>
          <Text
            color={"black"}
            fontWeight={"bold"}
            wordBreak={"break-word"}
            m={1}
          >
            {username}
          </Text>
          <Text color={"gray"} fontSize={".9rem"} ml={1}>
            {" "}
            {followers?.length} followers
          </Text>
        </Flex>
      </HStack>
      <Button
        bg={"blue"}
        my={"auto"}
        mr={"1"}
        _hover={{
          color: "black",
          backgroundColor: "blue.300",
        }}
        color={"white"}
        isLoading={loading}
        onClick={() =>
        {
          abc(uid);
        }}
      >
      {"Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestionComponent;
