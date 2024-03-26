import { Flex } from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import { Container, Text, Button } from "@chakra-ui/react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import useGetProfilebyUsername from "../hooks/useGetProfilebyUsername";
import { Link } from "react-router-dom"; 
const UserProfile = () =>
{
  let { username } = useParams();
  let { loading, userprofiledata } = useGetProfilebyUsername(username);
  console.warn(username);
  if (!loading && !userprofiledata.data) return <Nouser />;
  return (
    <Container maxW={"container.lg"} px={{ md: 20, base: 10 }}>
      <Flex direction={"column"} gap={0}>
        <ProfileHeader loading={loading} data={ userprofiledata.data} />
        <Posts loading={loading} data={userprofiledata.data} />
      </Flex>
    </Container>
  );
};

const Nouser = () => {
  return (
    <Flex w="full" h={"full"} justifyContent={"center"} alignItems={"center"}>
      <Flex direction={"row"} gap={5} alignItems={"center"}>
        <Text fontFamily={"var(--f1)"} fontSize={"20px"} m={0}>
          NO USERS FOUND 😢😢😢
        </Text>
        <Button to="/" variant={"danger"} className="btn btn-danger" as={Link}>
          Go to Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
