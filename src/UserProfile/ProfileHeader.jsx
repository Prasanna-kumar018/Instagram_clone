import {
  Flex,
  Avatar,
  AvatarGroup,
  VStack,
  HStack,
  Text,
  Button
  ,Link,
  Box,
  SkeletonText,
  SkeletonCircle,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditProfile from "./EditProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";
import { Link as RounterLink } from "react-router-dom";
import useFollow from "../hooks/useFollow";
import { useSelector } from "react-redux";
const ProfileHeader = ({ loading, data }) => {
 
    let { loading: followloading, abc } = useFollow();
    let { data: authuser } = useSelector((state) => state.user);
    let { isOpen, onOpen, onClose } = useDisclosure();
    let [user] = useAuthState(auth);
    if (loading)
    {
     return (
      <Box padding="6" boxShadow="lg" mt={10} bg="white">
        <HStack gap={3} p={3} alignItems={"center"}>
          <SkeletonCircle size="40" aspectRatio={1 / 1} />
          <SkeletonText
            mt="4"
            width={"container.lg"}
            noOfLines={5}
            spacing="4"
            skeletonHeight="2"
          />
        </HStack>
      </Box>
    );
  }
 
   
  if (!loading && data)
  {
 let Isauthuser = !loading && data && user && user.uid === data.uid;
 let Notauthuser = !loading && data && user && user.uid !== data.uid;
 let isfollowing;
    if (authuser !== null)
      isfollowing = authuser.following.includes(data.uid);
    return (
      <Flex
        py={10}
        mt={15}
        direction={"row"}
        gap={4}
        boxShadow={"0px 5px 10px black"}
        w="full"
        fontFamily={"cursive"}
      >
        <Link to={"/"+data.username } as={ RounterLink}>
        <AvatarGroup size={{ base: "xl", md: "2xl" }} ml={4} name="DJ">
          <Avatar bg="teal.500" src={data.profilePicURL} name={data.username} />
        </AvatarGroup>
        </Link>
        <VStack alignItems={"start"}>
          <Flex
            gap={3}
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Text m={0}>{data.username}</Text>
            {Isauthuser && (
              <Button
                bg="black"
                color={"white"}
                _hover={{
                  color: "black",
                  backgroundColor: "white",
                }}
                _focus={{ WebkitTextStroke: "1px red" }}
                onClick={() => {
                  onOpen();
                }}
              >
                Edit Profile
              </Button>
            )}
            <EditProfile isOpen={isOpen} onClose={onClose} />
            {Notauthuser && (
              <Button
                color={"white"}
                variant={"primary"}
                className="btn btn-primary"
                _focus={{ WebkitTextStroke: "1px red" }}
                isLoading={followloading}
                onClick={() =>
                {
                  abc(data.uid);
                }}
              >
                {isfollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Flex>
          <Flex gap={3}>
            <Text>
              <span style={{ fontWeight: "900" }}>{data.posts.length}</span>{" "}
              Posts
            </Text>
            <Text>
              <span style={{ fontWeight: "900" }}>{data.followers.length}</span>{" "}
              {"  "}Followers{" "}
            </Text>
            <Text>
              <span style={{ fontWeight: "900" }}>{data.following.length}</span>{" "}
              Following
            </Text>
          </Flex>
          <Text m={0} fontWeight={"900"}>
            {data.email}
          </Text>
          <Text m={0} fontWeight={"500"}>
            {data.bio}
          </Text>
        </VStack>
      </Flex>
    );
  }
};

export default ProfileHeader;
